(function (root) {
    'use strict';

    function HoverMenu(id) {
        this.$menuWrapper = document.querySelector('#' + id);
        this.$mainList = this.$menuWrapper.querySelector('ul');
        this.listChildrens = this.$mainList.children;
        this.nestedElements = [];
        this.extendedElement = null;
    }

    HoverMenu.prototype.getMenuElements = function () {
        return this.$mainList.querySelectorAll('li');
    };

    HoverMenu.prototype.getNestedElements = function () {
        var listElements = this.getMenuElements();
        Array.from(listElements).forEach((item) => {
            if (item.querySelector('ul') !== null)
                this.nestedElements.push(item);
        });
    };

    HoverMenu.prototype.hoverHandler = function () {
        this.$mainList.addEventListener('mouseover', this.change.bind(this), false);
        this.$mainList.addEventListener('mouseleave', this.close.bind(this), false);
    };

    HoverMenu.prototype.change = function (event) {
        var currentElement = event.target;
        var nestedList = currentElement.parentNode.querySelector('ul');
        var containsUl = currentElement.querySelector('ul');
        var isNestedElement = this.nestedElements.indexOf(currentElement.parentNode);

        if (isNestedElement >= 0) {
            if (this.extendedElement === null) {
                this.open(nestedList);
            }  else {
                this.close();
                this.open(nestedList);
            }
        } else if (this.isChildren(currentElement.parentNode)) {
            this.close();
        }
    };

    HoverMenu.prototype.isChildren = function(element) {
        var childrenCollection = Array.from(this.listChildrens);
        var isDirectChild = childrenCollection.indexOf(element);
        return isDirectChild >= 0 ? true : false;
    };

    HoverMenu.prototype.open = function (element) {
        element.classList.add('show');
        this.extendedElement = element;
    };

    HoverMenu.prototype.close = function () {
        if(this.extendedElement !== null) {
            this.extendedElement.classList.remove('show');
            this.extendedElement = null;
        }        
    };

    HoverMenu.prototype.setup = function () {
        this.getNestedElements();
        this.hoverHandler();
    };

    root.HoverMenu = HoverMenu;

}(window));
