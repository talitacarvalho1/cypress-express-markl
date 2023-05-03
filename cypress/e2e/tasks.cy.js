/// <reference types="cypress"/>


describe('tasks', () => {

    let testData;

    before( () => {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

    context('registration', () => {
        
        it('should create a new task', () => {

            const taskName = 'Read a node.js book'
    
            cy.removeTaskByName(taskName)
    
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName)
                .should('be.visible')
        })
    
        it('should not allow duplicated tasks', () => {
    
            const task = testData.dup
    
            cy.removeTaskByName(task.name)
    
            cy.postTask(task)
    
            cy.createTask(task.name)
    
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })
    
        it('required fields', () => {
            cy.createTask()
    
            cy.isRequired('This is a required field')
        })

    })

    context('update', () => {
        it('should complete a task', () => {
            const task = {
                name: 'Pay my bills', 
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('delete', () => {
        it('should delete a task', () => {
            const task = {
                name: 'Study Javascript', 
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})
