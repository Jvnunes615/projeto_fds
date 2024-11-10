describe('test suite avaliar produtos', () => {
    it('cenario1', () => {// valiação registrada com sucesso e visível para outros clientes.

        cy.visit('/');
        
     cy.get('.dropdown > button').then(($button) => {
            cy.wrap($button).trigger('mouseover');
    
            cy.get('.dropdown-menu').invoke('css', 'display', 'block');
    
            cy.get('.dropdown-menu').should('be.visible');
    
            cy.get('.dropdown-menu').click(); 
        });

        cy.get('#nome_usuario').type('Mariolf');
        cy.get('#senha').type('mar12345');
        cy.get('form > button').click();

        cy.visit('/historico_compras')
        cy.get('[type="number"]').type('4')
        cy.get('form > button').click()
        cy.get('.btn').click()
        cy.url().should('not.include', '/historico_compras');

        })

    it('cenario2', () => {// Exibir mensagem de erro indicando nota inválida e impedir o envio da avaliação.
    cy.visit('/');
        
     cy.get('.dropdown > button').then(($button) => {
            cy.wrap($button).trigger('mouseover');
    
            cy.get('.dropdown-menu').invoke('css', 'display', 'block');
    
            cy.get('.dropdown-menu').should('be.visible');
    
            cy.get('.dropdown-menu').click(); 
        });

        cy.get('#nome_usuario').type('Mariolf');
        cy.get('#senha').type('mar12345');
        cy.get('form > button').click();

        cy.visit('/historico_compras')
        cy.get('[type="number"]').type('11')
        cy.get('form > button').click()
        cy.url().should('include', '/historico_compras');

        })    
    })