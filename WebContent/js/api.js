var app = angular.module('produtosApp', []);
	
app.controller("ProdutosController", function($scope, ProdutosServices) {
	
	$scope.produto = {};

	listar();
	
	// método then atualiza a lista quando a função termina de ser
	// processada.
	function listar() {
		ProdutosServices.listar().then(function(resposta) {
			$scope.produtos = resposta.data;				
		});				
	};
	
	$scope.salvar = function(produto) {
		// $scope.produto
		ProdutosServices.salvar(produto).then(listar);

		$scope.produto = {};

	};
	
	$scope.excluir = function(produto) {
		ProdutosServices.excluir(produto).then(listar);
	};
	
	$scope.editar = function(produto) {
		$scope.produto = angular.copy(produto);
	};
	
	$scope.cancelar = function() {
		$scope.produto = {};				
	};
	
	
});

app.service("ProdutosServices", function($http) {
	
//	var api = "http://127.0.0.1:8080/api/produtos";
	var api = "http://localhost:3000/produtos";
	
	this.listar = function() {
		return $http.get(api);
	};
	
	this.salvar = function(produto) {
		if (produto.id) {
			// PUT
			return $http.put(api + "/" + produto.id, produto);
		}else{
			// POST
			return $http.post(api, produto);
		}

	};
	
	this.excluir = function(produto) {
		return $http.delete(api + "/" + produto.id);

	};
	
});

