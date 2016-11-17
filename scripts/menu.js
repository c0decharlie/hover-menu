'use strict';

(function (root) {

    function HoverMenu(element) {
        this.element = document.querySelector('#' + element);
        this.nestedElements = [];
    }

    HoverMenu.prototype.getMenuElements = function () {
        var $mainList = this.element.querySelector('ul');
        return $mainList.querySelectorAll('li');
    };

    HoverMenu.prototype.getNestedElements = function () {
        var listElements = this.getMenuElements();
        for (var i = 0; i < listElements.length; i++)
            if (listElements[i].querySelector('ul') !== null)
                this.nestedElements.push(listElements[i]);
    };

    HoverMenu.prototype.hoverHandler = function () {
        var ulElements = this.nestedElements;
        for (var i = 0; i < ulElements.length; i++) {
            ulElements[i].addEventListener('mouseenter', this.toggle);
            ulElements[i].addEventListener('mouseleave', this.toggle);
        }
    };

    HoverMenu.prototype.toggle = function () {
        var $hiddenElement = this.querySelector('ul');
        if ($hiddenElement.classList.contains('show')) {
            $hiddenElement.classList.remove('show');
        } else {
            $hiddenElement.classList.add('show')
        }
    };

    HoverMenu.prototype.setup = function () {
        this.getNestedElements();
        this.hoverHandler();
    };

    root.HoverMenu = HoverMenu;

}(window));
