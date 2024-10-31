from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import time

class FunctionalTests(StaticLiveServerTestCase):
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        edge_options = EdgeOptions()
        edge_options.add_argument
        cls.driver = webdriver.Edge(service=EdgeService(EdgeChromiumDriverManager().install()), options=edge_options)
        cls.driver.implicitly_wait(10)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        super().tearDownClass()

    def test_fornecedor_cadastrar_produto(self):
        print("Iniciando teste de cadastro de produto")
        self.driver.get(f'{self.live_server_url}/login/')
        
        username_input = self.driver.find_element(By.NAME, 'nome_usuario')
        password_input = self.driver.find_element(By.NAME, 'senha')
        username_input.send_keys('fornecedor2')
        password_input.send_keys('123')
        password_input.send_keys(Keys.RETURN)
        
        try:
            WebDriverWait(self.driver, 15).until(EC.url_contains('/home_fornecedor'))
            print("Redirecionado para home_fornecedor com sucesso.")
        except:
            print("Falha ao redirecionar para home_fornecedor.")
            print("URL atual:", self.driver.current_url)
            print("Conteúdo da página atual:", self.driver.page_source)
            self.fail("O teste falhou ao redirecionar para home_fornecedor após o login.")

        self.driver.get(f'{self.live_server_url}/cadastrar_produto/')
        
        nome_produto = self.driver.find_element(By.NAME, 'nome_produto')
        descricao = self.driver.find_element(By.NAME, 'descricao')
        preco = self.driver.find_element(By.NAME, 'preco')
        estoque = self.driver.find_element(By.NAME, 'estoque')
        disponivel = self.driver.find_element(By.NAME, 'disponivel')

        nome_produto.send_keys('Produto Teste')
        descricao.send_keys('Descrição do produto teste')
        preco.send_keys('50.00')
        estoque.send_keys('20')
        disponivel.click()
        
        self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
        
        try:
            WebDriverWait(self.driver, 15).until(EC.url_contains('/home_fornecedor'))
            print("Produto cadastrado e redirecionado para home_fornecedor.")
        except:
            print("Falha ao redirecionar para home_fornecedor após cadastro de produto.")
            print("URL atual:", self.driver.current_url)
            print("Conteúdo da página atual:", self.driver.page_source)
            self.fail("O teste falhou ao redirecionar para home_fornecedor após o cadastro de produto.")

        page_source = self.driver.page_source
        self.assertIn('Produto Teste', page_source)
        print("Teste de cadastro de produto concluído")

    def test_cliente_revisar_e_editar_carrinho(self):
        print("Iniciando teste de revisão e edição do carrinho")
        self.driver.get(f'{self.live_server_url}/login/')
        
        username_input = self.driver.find_element(By.NAME, 'nome_usuario')
        password_input = self.driver.find_element(By.NAME, 'senha')
        username_input.send_keys('galindo')
        password_input.send_keys('123')
        password_input.send_keys(Keys.RETURN)

        try:
            WebDriverWait(self.driver, 15).until(EC.url_contains('/home'))
            print("Redirecionado para a home do cliente com sucesso.")
        except:
            print("Falha ao redirecionar para home.")
            print("URL atual:", self.driver.current_url)
            print("Conteúdo da página atual:", self.driver.page_source)
            self.fail("Falha ao redirecionar para home após login.")

        self.driver.get(f'{self.live_server_url}/carrinho/')
        
        page_source = self.driver.page_source
        self.assertIn('Seu carrinho', page_source)
        
        quantidade_input = self.driver.find_element(By.NAME, 'quantidade')
        quantidade_input.clear()
        quantidade_input.send_keys('2')
        
        self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()

        total = self.driver.find_element(By.ID, 'total_carrinho').text
        self.assertIn('Total atualizado', total)
        print("Teste de revisão e edição do carrinho concluído")

    def test_cliente_adicionar_itens_ao_carrinho(self):
        print("Iniciando teste de adição de itens ao carrinho")
        self.driver.get(f'{self.live_server_url}/login/')
        
        username_input = self.driver.find_element(By.NAME, 'nome_usuario')
        password_input = self.driver.find_element(By.NAME, 'senha')
        username_input.send_keys('galindo')
        password_input.send_keys('123')
        password_input.send_keys(Keys.RETURN)

        try:
            WebDriverWait(self.driver, 15).until(EC.url_contains('/home'))
            print("Redirecionado para a home do cliente com sucesso.")
        except:
            print("Falha ao redirecionar para home.")
            print("URL atual:", self.driver.current_url)
            print("Conteúdo da página atual:", self.driver.page_source)
            self.fail("Falha ao redirecionar para home após login.")

        self.driver.get(f'{self.live_server_url}/detalhes_anonimo/1/')
        
        self.driver.find_element(By.XPATH, '//button[text()="Adicionar ao carrinho"]').click()

        try:
            WebDriverWait(self.driver, 15).until(EC.url_contains('/carrinho'))
            print("Redirecionado para carrinho após adicionar item.")
        except:
            print("Falha ao redirecionar para carrinho após adicionar item.")
            print("URL atual:", self.driver.current_url)
            print("Conteúdo da página atual:", self.driver.page_source)
            self.fail("Falha ao redirecionar para carrinho após adição de item.")

        page_source = self.driver.page_source
        self.assertIn('Produto Teste', page_source)
        print("Teste de adição de itens ao carrinho concluído")

    def test_cliente_favoritar_produto(self):
        print("Iniciando teste de favoritar produto")
        self.driver.get(f'{self.live_server_url}/login/')
        
        username_input = self.driver.find_element(By.NAME, 'nome_usuario')
        password_input = self.driver.find_element(By.NAME, 'senha')
        username_input.send_keys('galindo')
        password_input.send_keys('123')
        password_input.send_keys(Keys.RETURN)

        try:
            WebDriverWait(self.driver, 15).until(EC.url_contains('/home'))
            print("Redirecionado para a home do cliente com sucesso.")
        except:
            print("Falha ao redirecionar para home.")
            print("URL atual:", self.driver.current_url)
            print("Conteúdo da página atual:", self.driver.page_source)
            self.fail("Falha ao redirecionar para home após login.")

        self.driver.get(f'{self.live_server_url}/detalhes_anonimo/1/')
        
        self.driver.find_element(By.XPATH, '//button[@class="fav-icon"]').click()

        try:
            WebDriverWait(self.driver, 15).until(EC.url_contains('/favoritos'))
            print("Redirecionado para a lista de favoritos após favoritar.")
        except:
            print("Falha ao redirecionar para favoritos após favoritar produto.")
            print("URL atual:", self.driver.current_url)
            print("Conteúdo da página atual:", self.driver.page_source)
            self.fail("Falha ao redirecionar para lista de favoritos após favoritar produto.")

        page_source = self.driver.page_source
        self.assertIn('Produto Teste', page_source)
        print("Teste de favoritar produto concluído")

    def test_cliente_historico_compras(self):
        print("Iniciando teste de histórico de compras")
        self.driver.get(f'{self.live_server_url}/login/')
        username_input = self.driver.find_element(By.NAME, 'nome_usuario')
        password_input = self.driver.find_element(By.NAME, 'senha')
        username_input.send_keys('cliente_teste')
        password_input.send_keys('senha_teste')
        password_input.send_keys(Keys.RETURN)
        
        WebDriverWait(self.driver, 15).until(EC.url_contains('/home'))

        self.driver.get(f'{self.live_server_url}/historico_compras/')
        page_source = self.driver.page_source
        
        # Verifica se o histórico de compras é exibido
        self.assertIn('Histórico de Compras', page_source)
        print("Teste de histórico de compras concluído")

    def test_fornecedor_historico_vendas(self):
        print("Iniciando teste de histórico de vendas")
        self.driver.get(f'{self.live_server_url}/login/')
        username_input = self.driver.find_element(By.NAME, 'nome_usuario')
        password_input = self.driver.find_element(By.NAME, 'senha')
        username_input.send_keys('fornecedor2')
        password_input.send_keys('123')
        password_input.send_keys(Keys.RETURN)
        
        WebDriverWait(self.driver, 15).until(EC.url_contains('/home_fornecedor'))

        self.driver.get(f'{self.live_server_url}/historico_vendas/')
        page_source = self.driver.page_source
        
        # Verifica se o histórico de vendas é exibido
        self.assertIn('Histórico de Vendas', page_source)
        print("Teste de histórico de vendas concluído")
