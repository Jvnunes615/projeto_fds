describe('test suite editar produtos', () => {

    // Cenário : Produto atualizado com sucesso
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
        
        // Acessa a página de edição do produto
        cy.get(':nth-child(1)  > .card-body > .d-flex > .btn-group > a.btn').click();

        // Simula a edição de um campo, por exemplo, o nome do produto
        cy.get('#nome_produto').clear().type('Novo Nome do Produto');
        cy.get('#descricao').clear().type('Nova descrição do produto atualizado.');
        cy.get('#preco').clear().type('10.10');
        
        // Salva a atualização do produto
        cy.get('.container > form > button').click()        
        // Valida que a atualização foi concluída com sucesso
        cy.get(':nth-child(1) > .card-body > .card-title').should('contain', 'Novo Nome do Produto');

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

    // Cenário 2: Produto removido do catálogo e não é mais visível para os clientes
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
        
        // Acessa o botão para remover o produto
        cy.get(':nth-child(1) > .card-body > .d-flex > .btn-group > button.btn').click();
        
        cy.wait(2000)
        // Verifica que o produto não está mais visível na lista
        cy.get('#produto-6').should('not.exist');
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

    // Cenário 3: Exibir mensagem de erro informando quais campos são inválidos
    it('cenario3', () => { 
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

        // Acessa a página de edição do produto
        cy.get(':nth-child(1) > .card-body > .d-flex > .btn-group > a.btn').click();
        
        // Deixa campos obrigatórios em branco para testar validação
        cy.get('#nome_produto').clear();
        cy.get('#descricao').clear();
        
        // Tenta salvar o produto com os campos obrigatórios vazios
        cy.get('.container > form > button').click()       
        // Valida as mensagens de erro de campos obrigatórios
        cy.url().should('include', '/editar_produto');

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
});
