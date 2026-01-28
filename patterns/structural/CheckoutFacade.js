import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        // 4. Log the result of each step. If a step fails, log it and stop.
        const allInStock = this.inventoryService.checkStock(orderDetails.productIds);
        if (!allInStock) {
            console.log("Some products are out of stock. Cannot place order.");
            return;
        }
        const paymentSuccess = this.paymentService.processPayment(orderDetails.paymentInfo);
        if (!paymentSuccess) {
            console.log("Payment failed. Cannot place order.");
            return;
        }
        const shippingSuccess = this.shippingService.arrangeShipping(orderDetails.shippingInfo);
        if (!shippingSuccess) {
            console.log("Shipping arrangement failed. Cannot place order.");
            return;
        }
        console.log("Order placed successfully!");
    }
}

export { CheckoutFacade };
