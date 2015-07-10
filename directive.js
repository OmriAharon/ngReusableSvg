angular.module('omri-aharon.ng-reusable-svg', []).
    directive('oaCreateSvg', [function () {

        return {
            restrict: 'A',
            scope: {
                svgClick: '=',
                notifyReady: '=' /*** Created this since I duplicate the SVG later on, and we need to know when it's ready ***/
            },
            compile: function compile() {
                return {
                    pre: function preLink(scope, iElement, iAttrs) {
                        iElement.bind('load', function() {

                            // Basic element
                            var div = angular.element('<div style="float:left; height:' + iAttrs.height + 'px; width:' + iAttrs.width + 'px;"></div>');

                            // Transfering attributes
                            for (var attr in iAttrs) {
                                if (attr.indexOf('$') === -1 && attr !== 'type' && attr !== 'mkpCreateSvg' && attr !== 'data') {
                                    if (attr === 'toggle') {
                                        div.attr('data-toggle', iAttrs[attr]);
                                    }
                                    else {
                                        div.attr(attr, iAttrs[attr]);
                                    }
                                }
                            }

                            // Binding Click
                            var svg = iElement.contents().find('svg');
                            if (scope.svgClick) {
                                svg.bind('click', function () {
                                    scope.svgClick();
                                });
                            }

                            // Loading SVG into the element
                            div.html(svg);
                            angular.forEach(div.contents().find('g,path,polygon,circle,rect'), function(el){
                                $(el).removeAttr('fill');
                            });

                            // Actual element replacement
                            iElement.replaceWith(div);

                            // Ready notification
                            if (scope.notifyReady !== undefined) {
                                scope.notifyReady = true;
                            }
                        });
                    }
                };
            }
        };

    }]);