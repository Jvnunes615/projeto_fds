describe('test suite filtro produtos', () => {

    // Cenário 1: Exibir produtos que se encaixam na faixa de preço especificada
    it('cenario1', () => { 
        cy.visit('/cadastro');

        cy.get('#nome_completo').type('Fornecedor')
        cy.get('#email').type('For@nece.dor')
        cy.get('#nome_usuario').type('Fornecedor')
        cy.get('#senha').type('Fornecedor')
        cy.get('#confirm_senha').type('Fornecedor')
        cy.get('#tipo_usuario').select('Fornecedor')
        cy.get('form > button').click()

        cy.get('#nome_usuario').type('Fornecedor')
        cy.get('#senha').type('Fornecedor')
        cy.get('form > button').click()

        cy.visit('/cadastrar_produto')

        cy.get('#nome_produto').type('Produto')
        cy.get('#descricao').type('Produto')
        cy.get('#preco').type('100')
        cy.get('#estoque').type('100')
        cy.get('#disponivel').click()
        cy.get('.container > form > button').click()

        cy.visit('/'); 
        cy.wait(2000)
        // Define a faixa de preço para o filtro
        cy.get('[placeholder="Preço Mínimo"]').type('50'); // Preço mínimo
        cy.get('[placeholder="Preço Máximo"]').type('150'); // Preço máximo
        
        // Aplica o filtro de preços
        cy.get('#search-input').type('\n');

        // Verifica se produtos dentro da faixa de preço são exibidos
        cy.get('.card-title').should('exist')
        cy.wait(2000)

        cy.visit('/admin/auth/user')
        cy.get('#id_username').type('admin')
        cy.get('#id_password').type('123')
        cy.get('.submit-row > input').click()

        cy.get('select').select('Remover usuários selecionados')
        cy.get(':nth-child(1) > .action-checkbox > .action-select').click()
        cy.get('.button').click()
        cy.get('div > [type="submit"]').click()
        cy.wait(4000)

        });

    // Cenário 2: Não exibir produtos por não ter nenhum na faixa de preço especificada
    it('cenario2', () => { 
        cy.visit('/cadastro');

        cy.get('#nome_completo').type('Fornecedor')
        cy.get('#email').type('For@nece.dor')
        cy.get('#nome_usuario').type('Fornecedor')
        cy.get('#senha').type('Fornecedor')
        cy.get('#confirm_senha').type('Fornecedor')
        cy.get('#tipo_usuario').select('Fornecedor')
        cy.get('form > button').click()

        cy.get('#nome_usuario').type('Fornecedor')
        cy.get('#senha').type('Fornecedor')
        cy.get('form > button').click()

        cy.visit('/cadastrar_produto')

        cy.get('#nome_produto').type('Produto')
        cy.get('#descricao').type('Produto')
        cy.get('#preco').type('100')
        cy.get('#estoque').type('100')
        cy.get('#disponivel').click()
        cy.get('.container > form > button').click()

        cy.visit('/');         
        // Define uma faixa de preço que não tem produtos
        cy.get('[placeholder="Preço Mínimo"]').type('1000'); // Preço mínimo alto
        cy.get('[placeholder="Preço Máximo"]').type('1500'); // Preço máximo alto
        
        // Aplica o filtro de preços
        cy.get('#search-input').type('\n');

        // Verifica que não há produtos visíveis após aplicar o filtro
        cy.get('.card-title').should('not.exist');

        // Exibe uma mensagem de que não há produtos na faixa de preço
        cy.get('.alert').should('contain', 'Nenhum produto encontrado');


        cy.visit('/admin/auth/user')
        cy.get('#id_username').type('admin')
        cy.get('#id_password').type('123')
        cy.get('.submit-row > input').click()

        cy.get('select').select('Remover usuários selecionados')
        cy.get(':nth-child(1) > .action-checkbox > .action-select').click()
        cy.get('.button').click()
        cy.get('div > [type="submit"]').click()
        cy.wait(4000)
    });
});
