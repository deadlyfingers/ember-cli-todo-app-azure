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
			console.log("deleted item:" + " model:" + model.length);
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
	APPLICATION_URL : "https://___.azure-mobile.net/",
  APPLICATION_KEY : "",
  mobileServiceClient : null,

	client : function(){
    if(this.APPLICATION_URL === "" || this.APPLICATION_KEY === "") {
      throw "\nPlease configure your Azure Mobile Service URL & Application KEY (app/services/azure.js 61-62)";
    } else {
      if (this.mobileServiceClient == null) {
        console.log("Creating Mobile Service Client...");
        this.mobileServiceClient = new WindowsAzure.MobileServiceClient(this.APPLICATION_URL, this.APPLICATION_KEY);
      }
      return this.mobileServiceClient;
    }
	}

});

export default azureService;
