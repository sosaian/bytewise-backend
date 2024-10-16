import Transaction from '../models/Transaction.js'

export class TransactionController {
    static async create(req, res) {
        const { type_transaction, amount, description_transaction} = req.body
        const { id: USER_ID } = req.user

        try {
            const transactionId = await Transaction.createTransaction(USER_ID, type_transaction, amount, description_transaction)
            res.status(201).json({ id: transactionId })
        } catch (error) {
            res.status(500).json({ error: 'Error creating transaction' })
        }
    }

    static async get(req, res) {
        const { id } = req.params
        const { id: USER_ID } = req.user

        try {
            await TransactionAuth.verifyTransactionOwnership(id, USER_ID)

            const transaction = await Transaction.getTransactionById(id)
            
            if (transaction) {
                res.json(transaction)
            } else {
                res.status(404).json({ error: 'Transaction not found' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching transaction' })
        }
    }

    static async getAll(req, res) {
        const { id: USER_ID } = req.user

        try {
            const transaction = await Transaction.getAllTransactionsById(USER_ID)

            if (transaction) {
                res.json(transaction)
            } else {
                res.status(404).json({ error: 'Transaction not found' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching transaction' })
        }
    }

    static async update(req, res) {
        const { id } = req.params
        const { type_transaction, amount, date_transaction, description_transaction } = req.body
        const { id: USER_ID } = req.user
        const data = {}

        try {
            await TransactionAuth.verifyTransactionOwnership(id, USER_ID)
            
            if (type_transaction) data.type_transaction = type_transaction
            if (amount) data.amount = amount
            if (date_transaction) data.date_transaction = date_transaction
            if (description_transaction) data.description_transaction = description_transaction
            
            await Transaction.updateTransaction(id, data)
            
            res.json({ message: 'Transaction updated successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error updating transaction' })
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        const { id: USER_ID } = req.user

        try {
            await TransactionAuth.verifyTransactionOwnership(id, USER_ID)

            await Transaction.deleteTransaction(id)

            res.json({ message: 'Transaction deleted successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error deleting transaction' })
        }
    }

    static async getBudgetSummary(req, res) {
        const { id: USER_ID } = req.user
        
        try {
            const budgetSummary = await Transaction.getBudgetSummary(USER_ID)
            
            res.json(budgetSummary)
        } catch (error) {
            res.status(500).json({ error: 'Error fetching budget summary', error })
        }
    }
}

export class TransactionAuth {
    static async verifyTransactionOwnership(transaction_id, USER_ID) {
        const TARGETED_TRANSACTION = await Transaction.getTransactionById(transaction_id)
            
        if (!TARGETED_TRANSACTION) throw new Error('Transaction not found')

        if (TARGETED_TRANSACTION.id_user !== USER_ID) throw new Error('Invalid transaction n ID')
    }
}
