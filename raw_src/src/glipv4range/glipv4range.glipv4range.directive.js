angular.module('glIpv4Range').directive('glIpv4Range', ["$compile", function ($compile) {
    'use strict';

    return {
      restrict: 'EA',
      replace: true,
      scope: {
        settings: '=',
        api: '='
      },

      link: function (scope, element, attrs, controller) {

        var elementInputs = [];
        var elementInputsContainer;
        var elementError;
        var elementLabel;
        var elementValue;
        var elementSegmentSeperator;
        var elementSegmentRangeSeperator;

        scope.api = scope.api || {};
        scope.api._data = {};
        scope.api._data.capsLocked = false;
        scope.api._data.numberMouseOverSpinner = false;

        var classError = "gl-textfield-error";
        var classLabel = "gl-textfield-view-label";
        var classValue = "gl-textfield-view-value";

        scope.api1 = {};
        scope.api2 = {};
        scope.api3 = {};
        scope.api4 = {};
        scope.api5 = {};

        scope.api._data.name = angular.isUndefined(scope.settings.name) ? undefined : scope.settings.name;

        scope.settings1 = {name:'gl-'+scope.api._data.name+'-ipv4-seg-1', type:'number', numberSpinner:false, onKeyUp:onKeyUp1, onKeyDown:onKeyDown1};
        scope.settings2 = {nane:'gl-'+scope.api._data.name+'-ipv4-seg-2', type:'number', numberSpinner:false, onKeyUp:onKeyUp2, onKeyDown:onKeyDown2};
        scope.settings3 = {name:'gl-'+scope.api._data.name+'-ipv4-seg-3', type:'number', numberSpinner:false, onKeyUp:onKeyUp3, onKeyDown:onKeyDown3};
        scope.settings4 = {name:'gl-'+scope.api._data.name+'-ipv4-seg-4', type:'number', numberSpinner:false, onKeyUp:onKeyUp4, onKeyDown:onKeyDown4};
        scope.settings5 = {name:'gl-'+scope.api._data.name+'-ipv4-seg-5', type:'number', numberSpinner:false, onKeyUp:onKeyUp5, onKeyDown:onKeyDown5};

        var templateInputs = [
          '<gl-textfield class="gl-ipv4-1" api="api1" settings="settings1" >',
          '<gl-textfield class="gl-ipv4-2" api="api2" settings="settings2" >',
          '<gl-textfield class="gl-ipv4-3" api="api3" settings="settings3" >',
          '<gl-textfield class="gl-ipv4-4" api="api4" settings="settings4" >',
          '<gl-textfield class="gl-ipv4-5" api="api5" settings="settings5" >'
        ];

        var templateInputsContainer = '<div class="gl-ipv4-inputs"></div>';
        var templateError = '<p class="'+classError+'">{{api._data.error}}</p>';
        var templateLabel = '<label class="'+classLabel+'">{{api._data.label}}</label>';
        var templateValue = '<p class="'+classValue+'"></p>';
        var templateSeperator = '<span class="gl-ipv4-segment-separator">.</span>';
        var templateRangeSeperator = '<span class="gl-ipv4-segment-separator">/</span>';


        // MAP SETTINGS
        if(!angular.isUndefined(scope.settings.value)){
          scope.api._data.ipSegments = scope.settings.value.split(".");
        }else{
          scope.api._data.ipSegments = [];
        }
        scope.api._data.valid = angular.isUndefined(scope.settings.valid) ? true : scope.settings.valid;
        scope.api._data.label = angular.isUndefined(scope.settings.label) ? undefined : scope.settings.label;
        scope.api._data.disabled = angular.isUndefined(scope.settings.disabled) ? false : scope.settings.disabled;
        scope.api._data.placeholder = angular.isUndefined(scope.settings.placeholder) ? undefined : scope.settings.placeholder;
        scope.api._data.error = angular.isUndefined(scope.settings.error) ? undefined : scope.settings.error;
        scope.api._data.editable = angular.isUndefined(scope.settings.editable) ? true : scope.settings.editable;

        scope.api.setInvalid = function(msg){
          scope.api._data.valid = false;
          scope.api1.setInvalid();
          scope.api2.setInvalid();
          scope.api3.setInvalid();
          scope.api4.setInvalid();
          scope.api5.setInvalid();
          if(angular.isString(msg)){
            scope.api._data.error = msg;
          }else{
            scope.api._data.error = undefined;
          }
          errorMsgCheck();
        }

        scope.api.setValid = function(){
          scope.api._data.valid = true;
          scope.api1.setValid();
          scope.api2.setValid();
          scope.api3.setValid();
          scope.api4.setValid();
          scope.api5.setValid();
          errorMsgCheck();
        }

        scope.api.setValue = function(val){

          if(angular.isUndefined(val) || (angular.isString(val) && val.length == 0)){

            scope.api1.setValue();
            scope.api2.setValue();
            scope.api3.setValue();
            scope.api4.setValue();
            scope.api5.setValue();

          }else{

            scope.api._data.ipSegments = val.split(/\.|\//);
            if(!angular.isUndefined(scope.api._data.ipSegments)){
              if(!angular.isUndefined(parseInt(scope.api._data.ipSegments[0]))){
                scope.api1.setValue(parseInt(scope.api._data.ipSegments[0]));
              }
              if(!angular.isUndefined(parseInt(scope.api._data.ipSegments[1]))){
                scope.api2.setValue(parseInt(scope.api._data.ipSegments[1]));
              }
              if(!angular.isUndefined(parseInt(scope.api._data.ipSegments[2]))){
                scope.api3.setValue(parseInt(scope.api._data.ipSegments[2]));
              }
              if(!angular.isUndefined(parseInt(scope.api._data.ipSegments[3]))){
                scope.api4.setValue(parseInt(scope.api._data.ipSegments[3]));
              }
              if(!angular.isUndefined(parseInt(scope.api._data.ipSegments[4]))){
                scope.api5.setValue(parseInt(scope.api._data.ipSegments[4]));
              }
            }
          }

          // update view  mode
          if(!angular.isUndefined(elementValue)){
            elementValue.html(scope.api.getValue());
          }

        }

        scope.api.getValue = function(){
          var val = scope.api._data.ipSegments.slice(0,4).join(".");
          var range = scope.api._data.ipSegments[4];
          if(!angular.isUndefined(range) && range != null){
            val += "/" + scope.api._data.ipSegments[4];
          }
          return val;
        }

        scope.api.setPlaceholder = function(placeholder){ scope.api._data.placeholder = placeholder; scope.api1.setPlaceholder(placeholder); }
        scope.api.getPlaceholder = function(){ return scope.api._data.placeholder; }

        scope.api.setLabel = function(label){ scope.api._data.label = label; }
        scope.api.getLabel = function(){ return scope.api._data.label; }

        scope.api.view = function(){ setViewMode(); }
        scope.api.edit = function(){ setEditMode(); }

        scope.api.disable = function(){
          scope.api._data.disabled = true;
          scope.api1.disable();
          scope.api2.disable();
          scope.api3.disable();
          scope.api4.disable();
          scope.api5.disable();
        }


        scope.api.enable = function(){
          scope.api._data.disabled = false;
          scope.api1.enable();
          scope.api2.enable();
          scope.api3.enable();
          scope.api4.enable();
          scope.api5.enable();
        }

        var getElementInputs = function(){

          elementInputsContainer = angular.element(templateInputsContainer);
          elementSegmentSeperator = angular.element(templateSeperator);
          elementSegmentRangeSeperator = angular.element(templateRangeSeperator);

          for (var i = 0; i < templateInputs.length; i++) {
            var template = templateInputs[i];
            var el = angular.element(template);
            elementInputs[i] = el;
            elementInputsContainer.append(elementInputs[i]);
            if(i < 3) elementInputsContainer.append(elementSegmentSeperator.clone());
            if(i == 3) elementInputsContainer.append(elementSegmentRangeSeperator.clone());
          }

          var compiledEls = $compile(elementInputsContainer)(scope);

          if(scope.api._data.disabled){
            scope.api.disable();
          }

          return compiledEls;
        }

        var setViewMode = function(){
          scope.api._data.editable = false;
          element.children().remove();

          if(angular.isString(scope.api._data.label)){
            elementLabel = $compile(angular.element(templateLabel))(scope);
            element.append(elementLabel);
          }

          elementValue = $compile(angular.element(templateValue))(scope);
          elementValue.html(scope.api.getValue());
          element.append(elementValue);
        }

        var setEditMode = function(){

          scope.api._data.editable = true;
          element.children().remove();
          element.append(getElementInputs());

          var v = scope.api.getValue();
          scope.api.setValue(v);

          // init validity
          if(scope.api._data.valid){
            scope.api.setValid();
          }else{
            var errMsg = angular.isString(scope.api._data.error) ? scope.api._data.error : undefined;
            scope.api.setInvalid(errMsg);
          }

          errorMsgCheck();
        }

        var errorMsgCheck = function(){
          if(!angular.isUndefined(elementError)){
            elementError.remove();
          }
          if(scope.api._data.editable && !scope.api._data.valid && angular.isString(scope.api._data.error)){
            elementError = $compile(angular.element(templateError))(scope)
            element.append(elementError);
          }
        }

        // period tabs to next field
        function onKeyDown1(evt){
          if(evt.keyCode == 190){
            evt.preventDefault();
            elementInputs[1].find('input').focus();
          }
        }
        function onKeyDown2(evt){
          if(evt.keyCode == 190){
            evt.preventDefault();
            elementInputs[2].find('input').focus();
          }
        }
        function onKeyDown3(evt){
          if(evt.keyCode == 190){
            evt.preventDefault();
            elementInputs[3].find('input').focus();
          }
        }
        function onKeyDown4(evt){
          if(evt.keyCode == 190){
            evt.preventDefault();
            elementInputs[4].find('input').focus();
          }
        }function onKeyDown5(evt){
          if(evt.keyCode == 190){
            evt.preventDefault();
          }
        }

        // set segment model values
        function onKeyUp1(evt){
          scope.api._data.ipSegments[0] = scope.api1.getValue();;
        }

        function onKeyUp2(evt){
          scope.api._data.ipSegments[1] = scope.api2.getValue();
        }

        function onKeyUp3(evt){
          scope.api._data.ipSegments[2] = scope.api3.getValue();
        }

        function onKeyUp4(evt){
          scope.api._data.ipSegments[3] = scope.api4.getValue();
        }

        function onKeyUp5(evt){
          scope.api._data.ipSegments[4] = scope.api5.getValue();
        }


        // INIT
        if(angular.isString(scope.api._data.placeholder)){
          scope.settings1.placeholder = scope.api._data.placeholder;
        }

        if (!angular.isUndefined(scope.settings.view) && scope.settings.view == true){
          setViewMode();
        }else{
          setEditMode();
        }

      }
    };
  }]);
