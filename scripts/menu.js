'use strict';

(function (root) {

    function HoverMenu(id) {
        this.$menuWrapper = document.querySelector('#' + id);
        this.$mainList = this.$menuWrapper.querySelector('ul');
        this.nestedElements = [];
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
        this.$mainList.addEventListener('mouseenter', this.toggle, true);
        this.$mainList.addEventListener('mouseout', this.toggle, true);
    };

    HoverMenu.prototype.toggle = function (event) {
       if (event.target.nodeName === "LI") {
            var nestedList = event.target.querySelector('ul');
            nestedList.classList.toggle('show');
       } else {
           return false;
       }
    };

    HoverMenu.prototype.setup = function () {
        this.getNestedElements();
        this.hoverHandler();
    };

    root.HoverMenu = HoverMenu;

}(window));
