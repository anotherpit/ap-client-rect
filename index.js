(function() { 'use strict';

/**
 * @ngdoc module
 * @name anotherpit/apClientRect
 * @author anotherpit <anotherpit@gmail.com>
 */
var module = angular.module('anotherpit/apClientRect', ['ng']);

/**
 * @ngdoc service
 * @name apClientRect
 * @kind function
 *
 * @description
 * Wraps native getBoundingClientRect() to workaround known issues.
 * Particularly, fixes IE11 bug when element for fullscreened from within the iframe
 * (http://christophercurrie.github.io/technology/2014/03/20/internet-explorer-11-fullscreen-bug.html)
 *
 * @param {jqLite|HTMLElement} element
 * @returns {obejct} TextRectangle-compatible object with top, right, bottom, left, width and height
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect
 */
module.factory('apClientRect', ['$document', function($document) {
    return function apClientRect(element) {
        if (angular.isElement(element)) {
            var dom = element.nodeName ? element : element[0];
            var rect = angular.copy(dom.getBoundingClientRect());
            if ($document[0].msFullscreenElement) {
                if (dom.offsetWidth < dom.clientWidth) {
                    rect.top = rect.top * 100;
                    rect.right = rect.right * 100;
                    rect.bottom = rect.bottom * 100;
                    rect.left = rect.left * 100;
                }
            }
            rect.width = rect.right - rect.left;
            rect.height = rect.bottom - rect.top;
            return rect;
        }
    }
}]);

}());