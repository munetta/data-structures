var express = require('express');
const { request } = require('http');
var router = express.Router();
var pool = require('../db/mysql');

router.post('/client_link_make_purchase', async function(req, res) { //make sure to check the product_id as well... if good, use. if not, create one, test it, store it, and set it as the session to use 

    var error = {};
    let stripe;

    try { 
     stripe = require('stripe')(deobfuscate_stripe_private_token(req.session.stripe_private_key));
    } catch(err) { 
     error.stripe_token_error = 'stripe token is invalid'
    }

    if(!Array.isArray(req.body.shopping_cart)) { 
      error.shopping_cart_is_not_an_array = 'shopping cart is not an array'
    }
    
    let shopping_cart_comparison_total = 0;
    let database_total = 0;
    let build_query = 'SELECT * FROM products WHERE'; 
    let first_done = false;
    let question_mark_queue = [];

    for(let i = 0; i < req.body.shopping_cart.length; i++) { 
     if(typeof(req.session.shopping_cart[i].id) === 'number' && /[1-9][0-9]*/.test(req.session.shopping_cart[i].id)) { 
      shopping_cart_comparison_total += req.body.shopping_cart[i].total;
      if(first_done === false) {
       build_query += ` id = ?`;
       question_mark_queue.push(req.shopping_cart[i].id);
       first_done = true;
      } else {
       build_query += ` OR id = ?`;
       question_mark_queue.push(req.body.shopping_cart[i].id);
      } 
     } else { 
        error.shopping_cart_id_not_a_number = 'One of the shopping cart ids is not a number';
     }
    }

    build_query += 'AND WHERE business_show_id = ?';
    question_mark_queue.push(req.session.business_show_id);

    pool.query(build_query, question_mark_queue, function(results, error) { 

     if(error) { 
      error.could_not_select_all_products_from_cart_server_error = 'error selecting products from database';
     }
     
     if(results.length !== req.body.shopping_cart.length) {
      error.database_products_dont_match_client_products = 'There was an issue with matching the products on the client side and in the database'         
     }

     let order_values = [];

     for(let i = 0; i < results.length; i++) { 
      if(typeof(results[i].total) === 'number') { 
        database_total += results[i].total;
        order_values.push(results[i]);
      }
     }

     if(shopping_cart_comparison_total !== database_total) { 
      error.shopping_cart_total_does_not_equal_database_total = 'shopping cart total does not equal database total';
     }

     let charge_id;
     let customer_id;
     let total_amount_purchased;
     let stripe_product_id_used;
     let order_contents = '';
     let customer;
     let customer_charge;

     try { 
      customer = stripe.customers.create({  
       email: req.body.email, 
       phone: req.body.phone, 
       state: req.body.state, 
       city: req.body.city, 
       postal_1: req.body.address
      });
     } catch(err) { 
       error.could_not_create_customer = 'could not create the stripe customer';
     }

     try { 
      customer_charge = stripe.charges.create({
       product_id: req.session.product_id,
       customer_id: customer.id, 
       price: database_total * 100, 
       description: JSON.stringify(orders.values) //maybe switch this to the servers values --- maybe save both just make sure their information was correct
      });
     } catch(err) { 
       error.could_not_charge_customer = 'could not charge customer';
     }

     pool.query('INSERT INTO ORDERS (stripe_charge_id, stripe_customer_id, total_amount_purchased, stripe_product_id, database_order_contents, client_order_contents, order_complete) VALUES (?,?,?,?,?,?)', [charge_id, customer_id, total_amount_purchased, stripe_product_id_used, order_contents, JSON.stringify(req.session.shopping_cart), false], function(results, error) { //maybe add the current shopping cart contentts -- you pull the order contents

      if(error) { 
       error.could_not_insert_into_orders = 'could not insert payment into orders. Payment saved on file.';
      }

      return res.redirect('payment_successfule?room_id=${req.session.room_id}'); //just redirect to a payment successful page

     });

   });

}); 




module.exports = router;
