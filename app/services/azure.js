import Ember from 'ember';

var azureService = Ember.Object.extend({

  read : function(table){
		console.log(table + " read");
		return azureService.client().getTable(table).read().then(onComplete, onError);
		function onComplete(fulfilled){
			console.log("read items:" + fulfilled.length);
			return fulfilled;
		}
		function onError(error){
			console.log("Error reading item: " + error);
		}
	},

	insert : function(table, item, model){
		console.log(table + " insert:" + item.id + " model:" + model.length);
		return azureService.client().getTable(table).insert(item).then(onComplete, onError);
		function onComplete(fulfilledItem){
			// NB: use Ember's pushObject / unshiftObject to respect KVO!
			model.unshiftObject(fulfilledItem);
			console.log("inserted item:" + JSON.stringify(fulfilledItem) + " model:" + model.length);
			return fulfilledItem;
		}
		function onError(error){
			console.log("Error inserting item: "+error);
		}
	},

	del : function(table, item, model){
		console.log(table + " del:" + item.id + " model:" + model.length);
		return azureService.client().getTable(table).del(item).then(onComplete, onError);
		function onComplete(fulfilled){
      // NB: use Ember's removeObject to respect KVO!
			model.removeObject(item);
			console.log("deleted item (soft):" + " model:" + model.length);
			return fulfilled;
		}
		function onError(error){
			console.log("Error deleting item: " + error);
		}
	},

	update : function(table, item){
		console.log(table + " update:" + item.id);
		return azureService.client().getTable(table).update(item).then(onComplete, onError);
		function onComplete(fulfilledItem){
			console.log("updated item:" + JSON.stringify(fulfilledItem));
			return fulfilledItem;
		}
		function onError(error){
			console.log("Error updating item: " + error);
		}
	}

});

//  creates static properties and methods for the class
azureService.reopenClass({
	mobileServiceClient : new WindowsAzure.MobileServiceClient(
				"https://deadlyfingers.azure-mobile.net/",
				"aBLuTadsNEdhtRhRWFTBFEcvTnJkho20"),

	client : function(){
		return azureService.mobileServiceClient;
	}

});

export default azureService;
