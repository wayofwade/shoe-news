var globalThis=this,self=this;module.exports=require("../_commons/0.js")([{ids:[11],modules:{178:function(e,t){var n={target:"self",url:"",openType:"navigate",delta:1,appId:"",path:"",extraData:"",version:"release",hoverClass:"navigator-hover",hoverStopPropagation:!1,hoverStartTime:50,hoverStayTime:600,bindsuccess:function(){},bindfail:function(){},bindcomplete:function(){}};Component({options:{pureDataPattern:/^_/},properties:{extClass:{type:String,value:""},grids:{type:Array,value:[],observer:"_onGridsChange"}},data:{innerGrids:[]},ready:function(){},methods:{_onGridsChange:function(e){e&&this.setData({innerGrids:e.map((function(e){return Object.assign({},n,e)}))})},openPage:function(e){var t=e.currentTarget.dataset.url;wx.navigateTo({url:t,complete:function(e){}})}}})},19:function(e,t,n){e.exports=n(178)}},entries:[[19,0]]}]);