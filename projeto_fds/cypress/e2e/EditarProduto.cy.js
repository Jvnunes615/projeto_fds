describe('test suite editar produtos', () => {

    // Cenário 1: Produto atualizado com sucesso
    it('cenario1', () => { 
        cy.visit('/');
        
        cy.get('.dropdown > button').then(($button) => {
            cy.wrap($button).trigger('mouseover');
    
            cy.get('.dropdown-menu').invoke('css', 'display', 'block');
    
            cy.get('.dropdown-menu').should('be.visible');
    
            cy.get('.dropdown-menu').click(); 
        });

        cy.get('#nome_usuario').type('pjsilva');
        cy.get('#senha').type('pjs123');
        cy.get('form > button').click();
        
        // Verifica se a página redirecionou para o home do fornecedor
        cy.url().should('include', '/home_fornecedor');
        
        // Acessa a página de edição do produto
        cy.get('#produto-6 > .card-body > .d-flex > .btn-group > a.btn').click();

        // Simula a edição de um campo, por exemplo, o nome do produto
        cy.get('#nome_produto').clear().type('Novo Nome do Produto');
        cy.get('#descricao').clear().type('Nova descrição do produto atualizado.');
        
        // Salva a atualização do produto
        cy.get('form > .btn-primary').click();
        
        // Valida que a atualização foi concluída com sucesso
        cy.get('.alert-success').should('contain', 'Produto atualizado com sucesso');
    });

    // Cenário 2: Produto removido do catálogo e não é mais visível para os clientes
    it('cenario2', () => { 
        cy.visit('/');
        
     cy.get('.dropdown > button').then(($button) => {
            cy.wrap($button).trigger('mouseover');
    
            cy.get('.dropdown-menu').invoke('css', 'display', 'block');
    
            cy.get('.dropdown-menu').should('be.visible');
    
            cy.get('.dropdown-menu').click(); 
        });

        cy.get('#nome_usuario').type('pjsilva');
        cy.get('#senha').type('pjs123');
        cy.get('form > button').click();
        
        // Verifica se a página redirecionou para o home do fornecedor
        cy.url().should('include', '/home_fornecedor');
        
        // Acessa o botão para remover o produto
        cy.get('#produto-6 > .card-body > .d-flex > .btn-group > button.btn').click();
        
        // Verifica que o produto não está mais visível na lista
        cy.get('#produto-6').should('not.exist');
    });

    // Cenário 3: Exibir mensagem de erro informando quais campos são inválidos
    it('cenario3', () => { 
        cy.visit('/');
        
     cy.get('.dropdown > button').then(($button) => {
            cy.wrap($button).trigger('mouseover');
    
            cy.get('.dropdown-menu').invoke('css', 'display', 'block');
    
            cy.get('.dropdown-menu').should('be.visible');
    
            cy.get('.dropdown-menu').click(); 
        });
        
        cy.get('#nome_usuario').type('pjsilva');
        cy.get('#senha').type('pjs123');
        cy.get('form > button').click();
        
        // Verifica se a página redirecionou para o home do fornecedor
        cy.url().should('include', '/home_fornecedor');
        
        // Acessa a página de edição do produto
        cy.get('#produto-7 > .card-body > .d-flex > .btn-group > a.btn').click();
        
        // Deixa campos obrigatórios em branco para testar validação
        cy.get('#nome_produto').clear();
        cy.get('#descricao').clear();
        
        // Tenta salvar o produto com os campos obrigatórios vazios
        cy.get('form > .btn-primary').click();
        
        // Valida as mensagens de erro de campos obrigatórios
        cy.get('.alert-danger').should('contain', 'Nome do produto é obrigatório');
        cy.get('.alert-danger').should('contain', 'Descrição do produto é obrigatória');
    });
});
