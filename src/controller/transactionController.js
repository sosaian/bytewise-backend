import Transaction from '../models/Transaction.js';

class TransactionController {
    static async create(req, res) {
        const { id_user, type_transaction, amount, date_transaction } = req.body;
        try {
            const transactionId = await Transaction.createTransaction(id_user, type_transaction, amount, date_transaction);
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
        const { type_transaction, amount, date_transaction } = req.body;
        try {
            await Transaction.updateTransaction(id, type_transaction, amount, date_transaction);
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
}

export default TransactionController;
