var expect = require('chai').expect

describe('DB Utils', () => {
    const dbUtils = require('../util/dbUtils')
    
    describe('formatInsertQuery', () => {
        it('should return 1 field and 1 value in query', () => {
            var output = dbUtils.formatInsertQuery('category', ['name'], ['*'])
            expect(output).to.be.equal('INSERT INTO category(name) VALUES($1) RETURNING *')
        })
        it('should return multiple fields and values in query', () => {
            var output = dbUtils.formatInsertQuery('category', ['name', 'description'], ['id', 'name', 'description'])
            expect(output).to.be.equal('INSERT INTO category(name,description) VALUES($1,$2) RETURNING id,name,description')
        })
    })

    describe('formatSelectAllQuery', () => {
        it('should return a query with 1 column parameter', () => {
            var output = dbUtils.formatSelectAllQuery('category', ['*'])
            expect(output).to.be.equal('SELECT * FROM category')
        })

        it('should return a query with multiple column parameters', () => {
            var output = dbUtils.formatSelectAllQuery('category', ['id', 'name', 'description'])
            expect(output).to.be.equal('SELECT id,name,description FROM category')
        })
    })

    describe('formatSelectWhereQuery', () => {
        it('should return a query with 1 column parameter', () => {
            var output = dbUtils.formatSelectWhereQuery('category', ['id', 'name', 'description'],['id'])
            expect(output).to.be.equal('SELECT id,name,description FROM category WHERE id=$1')
        })

        it('should return a query with multiple column parameters', () => {
            var output = dbUtils.formatSelectWhereQuery('category', ['*'],['name', 'description'])
            expect(output).to.be.equal('SELECT * FROM category WHERE name=$1 AND description=$2')
        })
    })

    describe('formatUpdateWhereQuery', () => {
        it('should return a query with 1 column parameter', () => {
            var output = dbUtils.formatUpdateWhereQuery('category', ['name', 'description'],['id'], ['*'])
            expect(output).to.be.equal('UPDATE category SET name=$1,description=$2 WHERE id=$3 RETURNING *')
        })

        it('should return a query with multiple column parameters', () => {
            var output = dbUtils.formatUpdateWhereQuery('category', ['name', 'description'], ['name', 'description'], ['id', 'name', 'description'])
            expect(output).to.be.equal('UPDATE category SET name=$1,description=$2 WHERE name=$3 AND description=$4 RETURNING id,name,description')
        })
    })

    describe('formatDeleteWhereQuery', () => {
        it('should return a query with 1 column parameter', () => {
            var output = dbUtils.formatDeleteWhereQuery('category', ['id'])
            expect(output).to.be.equal('DELETE FROM category WHERE id=$1')
        })

        it('should return a query with multiple column parameters', () => {
            var output = dbUtils.formatDeleteWhereQuery('category', ['name', 'description'])
            expect(output).to.be.equal('DELETE FROM category WHERE name=$1 AND description=$2')
        })
    })
})