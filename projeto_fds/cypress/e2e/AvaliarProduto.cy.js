describe('test suite avaliar produtos', () => {
    it('cenario1', () => {// valiação registrada com sucesso e visível para outros clientes.
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

        cy.visit('/logout');

        cy.visit('/cadastro');

        cy.get('#nome_completo').type('Consumidor')
        cy.get('#email').type('Con@sumi.dor')
        cy.get('#nome_usuario').type('Consumidor')
        cy.get('#senha').type('Consumidor')
        cy.get('#confirm_senha').type('Consumidor')
        cy.get('#tipo_usuario').select('Cliente')
        cy.get('form > button').click()

        cy.get('#nome_usuario').type('Consumidor')
        cy.get('#senha').type('Consumidor')
        cy.get('form > button').click()
        
        cy.get('.btn-group > .btn').click()

        cy.get('.rounded-button').click()

        cy.visit('/carrinho')
        cy.get('.finalizar-compra').click()

        cy.visit('/historico_compras')
        cy.get('[type="number"]').type('4')
        cy.get('form > button').click()
        cy.get('.btn').click()
        cy.url().should('not.include', '/historico_compras');

        cy.wait(2000)

        cy.visit('/admin/auth/user')
        cy.get('#id_username').type('admin')
        cy.get('#id_password').type('123')
        cy.get('.submit-row > input').click()

        cy.get('select').select('Remover usuários selecionados')
        cy.get(':nth-child(1) > .action-checkbox > .action-select').click()
        cy.get(':nth-child(2) > .action-checkbox > .action-select').click()
        cy.get('.button').click()
        cy.get('div > [type="submit"]').click()
        cy.wait(4000)

        })

    it('cenario2', () => {// Exibir mensagem de erro indicando nota inválida e impedir o envio da avaliação.
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

        cy.visit('/logout');

        cy.visit('/cadastro');

        cy.get('#nome_completo').type('Consumidor')
        cy.get('#email').type('Con@sumi.dor')
        cy.get('#nome_usuario').type('Consumidor')
        cy.get('#senha').type('Consumidor')
        cy.get('#confirm_senha').type('Consumidor')
        cy.get('#tipo_usuario').select('Cliente')
        cy.get('form > button').click()

        cy.get('#nome_usuario').type('Consumidor')
        cy.get('#senha').type('Consumidor')
        cy.get('form > button').click()
        
        cy.get('.btn-group > .btn').click()

        cy.get('.rounded-button').click()

        cy.visit('/carrinho')
        cy.get('.finalizar-compra').click()

        cy.visit('/historico_compras')
        cy.get('[type="number"]').type('11')
        cy.get('form > button').click()
        cy.url().should('include', '/historico_compras');
cy.wait(2000)

        cy.visit('/admin/auth/user')
        cy.get('#id_username').type('admin')
        cy.get('#id_password').type('123')
        cy.get('.submit-row > input').click()

        cy.get('select').select('Remover usuários selecionados')
        cy.get(':nth-child(1) > .action-checkbox > .action-select').click()
        cy.get(':nth-child(2) > .action-checkbox > .action-select').click()
        cy.get('.button').click()
        cy.get('div > [type="submit"]').click()
        cy.wait(4000)
        })    
    })