import Transaction from '../models/Transaction.js';

class TransactionController {
    static async create(req, res) {
        const { id_user, type_transaction, amount, description_transaction} = req.body;
        try {
            const transactionId = await Transaction.createTransaction(id_user, type_transaction, amount, description_transaction);
            res.status(201).json({ id: transactionId });
        } catch (error) {
            res.status(500).json({ error: 'Error creating transaction' });
        }
    }

    static async get(req, res) {
        const { id } = req.params;
        try {
            const transaction = await Transaction.getTransactionById(id);
            if (transaction) {
                res.json(transaction);
            } else {
                res.status(404).json({ error: 'Transaction not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching transaction' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { type_transaction, amount, date_transaction, description_transaction } = req.body;
    
        // Crear un objeto con los campos opcionales que se quieren actualizar
        const data = {};
        if (type_transaction) data.type_transaction = type_transaction;
        if (amount) data.amount = amount;
        if (date_transaction) data.date_transaction = date_transaction;
        if(description_transaction) data.description_transaction = description_transaction;
    
        try {
            await Transaction.updateTransaction(id, data);
            res.json({ message: 'Transaction updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating transaction' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await Transaction.deleteTransaction(id);
            res.json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting transaction' });
        }
    }


    // Obtener resumen del presupuesto
    static async getBudgetSummary(req, res) {
        const { id_user } = req.params; // Se asume que el id_user se pasa como parámetro
        try {
            const budgetSummary = await Transaction.getBudgetSummary(id_user);
            res.json(budgetSummary);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching budget summary', error });
        }
    }
}

export default TransactionController;
