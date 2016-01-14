angular.module('ngReusableSvg', []).
    directive('oaReusableSvg', ['$timeout', '$compile', function ($timeout, $compile) {

        return {
            restrict: 'A',
            scope: {
                eventHandler: '&ngClick',
                notifyReady: '=',
                /*** Created this since I duplicate the SVG later on, and we need to know when it's ready ***/
                float: '=',
                classEventHandler: '&ngClass'
            },
            compile: function compile() {
                return {
                    pre: function preLink(scope, iElement, iAttrs) {
                        var svgReady = false;

                        scope.$watch(function () {
                            return svgReady;
                        }, function (newVal) {
                            if (!newVal) {
                                iElement.css('visibility', 'hidden');
                            }
                            else {
                                iElement.css('visibility', 'visible');
                            }
                        });

                        iElement.bind('load', function () {

                            $timeout(function () {

                                // Basic element
                                var div = angular.element('<div ng-click="eventHandler()" ng-class="classEventHandler()" style="height:' + iAttrs.height + 'px; width:' + iAttrs.width + 'px;' + (scope.float !== false ? 'float:left;"' : '"') + '>s</div>');
                                $compile(div)(scope);

                                // Transfering attributes
                                for (var attr in iAttrs) {
                                    if (attr.indexOf('$') === -1 && attr !== 'type' && attr !== 'oaReusableSvg' && attr !== 'data' && attr !== 'ngClick' && attr !== 'ngClass') {
                                        if (attr === 'toggle') {
                                            div.attr('data-toggle', iAttrs[attr]);
                                        }
                                        else {
                                            div.attr(attr, iAttrs[attr]);
                                        }
                                    }
                                }

                                // Loading SVG into the element
                                var svg = iElement.contents().find('svg');
                                div.html(svg);
                                angular.forEach(div.contents().find('g,path,polygon,circle,rect'), function (el) {
                                    $(el).removeAttr('fill');
                                });

                                // Actual element replacement
                                iElement.replaceWith(div);


                                // Ready notification
                                svgReady = true;
                                if (scope.notifyReady !== undefined) {
                                    scope.notifyReady = true;
                                }
                            }, 0);
                        });
                    }
                };
            }
        };

    }]);