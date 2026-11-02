const {create_order} = require('../db/db');
const {create_order_items} = require('../db/db');
const {productItems} = require('../db/db');
const {custUser} = require('../db/db')
const {sequelize} = require('../db/db')
const {Sequelize, DATE, where} = require('sequelize');




/**
 * 
 * 1. creating or getting new orders controller
 * 2. get all orders in admin dashboard in descending orders by date 
 * 3. accepting orders by admin
 * 4. cancelling orders by customer or admin
 * 5. updating order details by customer
 */

// getting new orders from the customers

const newOrderControllers = async (req, res) =>{
    try{
        const {total_price,status, placed_at,address, itemsData} = req.body;

        const user_id = req.id;

        await create_order.sync();
        await create_order_items.sync();
        

        const userValid = await custUser.findByPk(user_id)
        if(!userValid){
            return res.status(404).json({
                message: "Invalid User!"
            })
        }
        
       
        


        // order entry transaction
        const result = await sequelize.transaction(async (tranc_1) =>{
            
        //     // create new order
            const newOrder = await create_order.create({
                user_id,
                total_price,
                status : 'done' || status,
                placed_at,
                address
            }, {transaction: tranc_1});

            const order_id = newOrder.id;

            // mapping order id with each items
            const order_items = itemsData.map( item => ({
                order_id : newOrder.id,
                ...item
            }));
            // 4. Bulk insert the items, passing the same transaction object
            const newItems = await create_order_items.bulkCreate(order_items, {transaction: tranc_1});
                
            return {order: newOrder}
        });

        if(!result){
            return res.status(400).json({
                message: "order failed!"
            })
        }
        // console.log(result.order.id) // for development only
        return res.status(200).json({
            message: "order successfull",
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "transaction Failed || order Failed! something went wrong."
        });
    }
}
// getting all orders in admin panel
const getAllOrdersControllers = async (req, res) =>{
    try{
        const all_orders = await create_order.findAll({
            // 1. Select specific fields from the Order table
            attributes: [
                ["id", 'order_id'],
                'user_id',
                ['total_price', 'orderTotalPrice'], // Aliasing total_price to orderTotalPrice
                ['status', 'orderStatus'],
                ['address', 'delivery_address'],
                ['created_at', 'orderTime'] // or 'updated_at' depending on your schema
            ],
            include: [
                {
                model: custUser,
                as: 'users',
                // 2. Select specific fields from the User table
                attributes: ['full_name', 'phone_number'] 
                },
                {
                model: create_order_items,
                as: 'items', // Must match the alias defined in the association
                // 3. Select specific fields from the OrderItems table
                attributes: ['price_at_purchage', 'quantity'],
                include:[
                    {
                        model: productItems,
                        attributes: ['product_name', 'marchant_name']
                    }
                ]
                }
            ],
            order: [['created_at', 'DESC']]

        });
        if(!all_orders){
            return res.status(500).json({
                message: 'internal Fetching issue!'
            })
        }
        return res.status(200).json({
            all_orders
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "internal server error!"
        })
    }
}

// getting orders by user id
const getOrdersByUserIdController = async (req, res) =>{
    id = req.id;
    try{
        const my_orders = await create_order.findAll({
            where:{
                user_id: id
            },
            include: [
                {
                    model: create_order_items,
                    as: 'items',
                    attributes: ["price_at_purchage", "quantity"],
                    include: [
                        {
                            model: productItems,
                            attributes: ['product_name', 'image_url']
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });
        console.log(my_orders)
        if(!my_orders){
            return res.status(400).json({
                message: 'bad request'
            })
        }
        return res.status(200).json({
            message: 'all products of your successfully retrive!',
            my_orders
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

// accepting orders by admin
const statusUpdateOrdersControllers = async (req, res) =>{
    const {id} = req.params;
    const {status} =  req.body;
    current_date = new Date();


    try{
        const [order_update_row] = await create_order.update(
        {
            status: status,
            accepted_at: current_date.toLocaleString()
        },
        {where: {id: id}}
        );

        if(order_update_row === 0){
            return res.status(404).json({
                message: `Order with ID ${id} not found.`
            });
        }

        return res.status(200).json({
            message: "Order updated successfully."
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
}


// update orders by customer
const updateOrdersControllers = async (req, res) =>{
   
}

module.exports = {
    newOrderControllers, 
    statusUpdateOrdersControllers,  
    updateOrdersControllers,
    getAllOrdersControllers,
    getOrdersByUserIdController
}