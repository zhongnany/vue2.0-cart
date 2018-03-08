var vm = new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false
	},
	filters:{
		formatMoney:function(value){
			return "￥ " + value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.cartView();
		})
	},
	methods:{
		cartView:function(){
			var _this = this;
			this.$http.get("data/cartData.json",{"id":123}).then(function(res){
				_this.productList = res.data.result.list;
				_this.totalMoney = res.data.result.totalMoney;
			});
		},
		changeMoney:function(product,way){
			if(way > 0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity < 1){
					product.productQuantity = 1;
				}
			}
		},
		selectedProduct:function(item){
			if(typeof item.checked == "undefined"){
				Vue.set(item,"checked",true);
			}else{
				item.checked = !item.checked;
			}
		},
		checkAll:function(flag){
			this.checkAllFlag = flag;
			var _this = this;
			this.productList.forEach(function(item,index){
				if(typeof item.checked == "undefined"){
				_this.$set(item,"checked",_this.checkAllFlag);
				}else{
					item.checked = _this.checkAllFlag;
				}
			});
		}
    }
});