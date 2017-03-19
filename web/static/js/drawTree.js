'use strict';
var template = OpenAPISpecificationVisualDocumentation.tooltip;

function getStrokeColor(node) {
  var color;
  if (node.isTechnical) {
    color = 'grey';
  }
  else if (node.changelog !== undefined && node.changelog.isNew) {
    color = 'green';
  }
  else if (node.changelog !== undefined && node.changelog.isModified) {
    color = '#f69640';
  }
  else if (node.typeChangelog !== undefined && node.typeChangelog.isNew) {
    color = 'green';
  }
  else if (node.typeChangelog !== undefined && node.typeChangelog.isModified) {
    color = '#f69640';
  }
  else if (node.parent !== undefined && node.parent.typeChangelog !== undefined && node.parent.typeChangelog.isNew) {
    color = 'green';
  }
  else {
    color = 'steelblue';
  }
  return color;
}

function getFillColor(node) {
  var color;
  if (node.closedChildren){
    if (node.isTechnical) {
        color = 'lightgrey';
    }
    else if (node.changelog !== undefined && node.changelog.isNew) {
        color = 'lightgreen';
    }
    else if (node.changelog !== undefined && node.changelog.isModified) {
        color = '#ffd06f';
    }
    else if (node.typeChangelog !== undefined && node.typeChangelog.isNew) {
        color = 'lightgreen';
    }
    else if (node.typeChangelog !== undefined && node.typeChangelog.isModified) {
        color = '#ffd06f';
    }
    else if (node.parent !== undefined && node.parent.typeChangelog !== undefined && node.parent.typeChangelog.isNew) {
        color = 'lightgreen';
    }
    else {
        color = 'lightblue';
    }
  }
  else {
    color = '#fff';
  }
  return color;
}

//Adapted from http://bl.ocks.org/robschmuecker/7880033
//DIV tooltip adapted from http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
function drawTree(treeData){

    // Calculate total nodes, max label length
    var totalNodes = 0;
    var maxLabelLength = 0;
    // variables for drag/drop
    var selectedNode = null;
    var draggingNode = null;
    // panning variables
    var panSpeed = 200;
    var panBoundary = 20; // Within 20px from edges will pan when dragging.
    var panTimer;
    // Misc. variables
    var i = 0;
    var duration = 750;
    var root;

    // size of the diagram
    $('#tree-container').empty();
    $('#tooltip').empty();
    $('#help').show();
    var viewerWidth = $('#tree-container').width();
    var viewerHeight = $(document).height() - $('#tree-container').position().top - 50;
    $('#tooltip-container').css('max-height',viewerHeight+'px');

    var toolTipY = $('#tree-container').position().top;
    var toolTipX = $('#tree-container').position().left;

    var tree = d3.layout.tree()
        .size([viewerHeight, viewerWidth]);

    function showToolip(d){
        //console.log(d);
      if(d.description || d.typeDescription){
        $('#help').hide();
         var jdiv = $('#tooltip');
         jdiv.html(template(d));
         /*
         //http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
    //var div = d3.select('body').append('div')
    var div = d3.select('#tooltip-container')
        //.attr('class', 'tooltip')
        .attr('id', 'node-tooltip');
        //.style('opacity', 0);
          console.log(div),
        div.transition()
            .duration(200)
            .style('opacity', .9);
        //Getting html from Handlebars template
        div .html(template(d))
            .style('height', viewerHeight + 'px')
            .style('overflow', 'scroll');
            //.style('left', (d3.event.pageX) + 'px')
            //.style('top', (d3.event.pageY) + 'px');
            //.style('left', '0px')
            //.style('top', '80px' );
            //.style('left', toolTipX + 'px')
            //.style('top', toolTipY + 'px');
           */ 
      }
    }

    function hideTooltip(d){
      //div.transition()
      //    .duration(500)
      //    .style('opacity', 0);
    }

    // define a d3 diagonal projection for use by the node paths later on.
    var diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    // A recursive helper function for performing some setup by walking through all nodes

    function visit(parent, visitFn, childrenFn) {
        if (!parent) {
          return;
        }

        visitFn(parent);

        var children = childrenFn(parent);
        if (children) {
            var count = children.length;
            for (var j = 0; j < count; j++) {
                visit(children[j], visitFn, childrenFn);
            }
        }
    }

    // Call visit function to establish maxLabelLength
    visit(treeData, function(d) {
        totalNodes++;
        maxLabelLength = Math.max(d.name.length, maxLabelLength);

    }, function(d) {
        return d.children && d.children.length > 0 ? d.children : null;
    });


    // sort the tree according to the node names

    function sortTree() {
        tree.sort(function(a, b) {
            return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
        });
    }

    // TODO: Pan function, can be better implemented.

    function pan(domNode, direction) {
        var speed = panSpeed;
        if (panTimer) {
            clearTimeout(panTimer);
            var translateCoords = d3.transform(svgGroup.attr('transform'));
            var translateX;
            var translateY;
            if (direction === 'left' || direction === 'right') {
                translateX = direction === 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
                translateY = translateCoords.translate[1];
            } else if (direction === 'up' || direction === 'down') {
                translateX = translateCoords.translate[0];
                translateY = direction === 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
            }
            var scaleX = translateCoords.scale[0];
            var scaleY = translateCoords.scale[1];
            var scale = zoomListener.scale();
            svgGroup.transition().attr('transform', 'translate(' + translateX + ',' + translateY + ')scale(' + scale + ')');
            d3.select(domNode).select('g.node').attr('transform', 'translate(' + translateX + ',' + translateY + ')');
            zoomListener.scale(zoomListener.scale());
            zoomListener.translate([translateX, translateY]);
            panTimer = setTimeout(function() {
                pan(domNode, speed, direction);
            }, 50);
        }
    }

    // Define the zoom function for the zoomable tree
    function zoom() {
        svgGroup.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
    }

    // define the zoomListener which calls the zoom function on the 'zoom' event constrained within the scaleExtents
    var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on('zoom', zoom);

    // define the baseSvg, attaching a class for styling and the zoomListener
    var baseSvg = d3.select('#tree-container').append('svg')
        .attr('width', viewerWidth)
        .attr('height', viewerHeight)
        .attr('class', 'overlay')
        .call(zoomListener);


    // Helper functions for collapsing and expanding nodes.
    function collapse(d) {
        if (d.children) {
            d.closedChildren = d.children;
            d.closedChildren.forEach(collapse);
            d.children = null;
        }
    }

    function expand(d) {
        if (d.closedChildren) {
            d.children = d.closedChildren;
            d.children.forEach(expand);
            d.closedChildren = null;
        }
    }

    var overCircle = function(d) {
        selectedNode = d;
        updateTempConnector();
    };
    var outCircle = function(d) {
        selectedNode = null;
        updateTempConnector();
    };

    // Function to update the temporary connector indicating dragging affiliation
    var updateTempConnector = function() {
        var data = [];
        if (draggingNode !== null && selectedNode !== null) {
            // have to flip the source coordinates since we did this for the existing connectors on the original tree
            data = [{
                source: {
                    x: selectedNode.y0,
                    y: selectedNode.x0
                },
                target: {
                    x: draggingNode.y0,
                    y: draggingNode.x0
                }
            }];
        }
        var link = svgGroup.selectAll('.templink').data(data);

        link.enter().append('path')
            .attr('class', 'templink')
            .attr('d', d3.svg.diagonal())
            .attr('pointer-events', 'none');

        link.attr('d', d3.svg.diagonal());

        link.exit().remove();
    };

    // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.
    function centerNode(source) {
        var scale = zoomListener.scale();
        var x = -source.y0;
        var y = -source.x0;
        x = x * scale + viewerWidth / 2;
        y = y * scale + viewerHeight / 2;
        d3.select('g').transition()
            .duration(duration)
            .attr('transform', 'translate(' + x + ',' + y + ')scale(' + scale + ')');
        zoomListener.scale(scale);
        zoomListener.translate([x, y]);
    }

    // Toggle children function
    function toggleChildren(d) {
        if (d.children) {
            d.closedChildren = d.children;
            d.children = null;
        } else if (d.closedChildren) {
            d.children = d.closedChildren;
            d.closedChildren = null;
        }
        return d;
    }

    // Toggle children on click.
    function click(d) {
        if (d3.event.defaultPrevented) {
          return;
        }// click suppressed
        d = toggleChildren(d);
        update(d);
        centerNode(d);
    }

    function update(source) {
        // Compute the new height, function counts total children of root node and sets tree height accordingly.
        // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
        // This makes the layout more consistent.
        var levelWidth = [1];
        var childCount = function(level, n) {

            if (n.children && n.children.length > 0) {
                if (levelWidth.length <= level + 1) {
                  levelWidth.push(0);
                }

                levelWidth[level + 1] += n.children.length;
                n.children.forEach(function(d) {
                    childCount(level + 1, d);
                });
            }
        };
        childCount(0, root);
        var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line
        tree = tree.size([newHeight, viewerWidth]);

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Set widths between levels based on maxLabelLength.
        nodes.forEach(function(d) {
            d.y = (d.depth * (maxLabelLength * 10)); //maxLabelLength * 10px
            // alternatively to keep a fixed scale one can set a fixed depth per level
            // Normalize for fixed-depth by commenting out below line
            // d.y = (d.depth * 500); //500px per level.
        });

        // Update the nodes…
        var node = svgGroup.selectAll('g.node')
            .data(nodes, function(d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            //.call(dragListener)
            .attr('class', 'node')
            .attr('transform', function(d) {
                return 'translate(' + source.y0 + ',' + source.x0 + ')';
            })
            .on('click', click)
            .on('mouseover', function(d) {
              showToolip(d);
            })
            .on('mouseout', function(d) {
              hideTooltip(d);
            });

          nodeEnter.append('circle')
              .attr('class', 'nodeCircle')
              .attr('r', 0)
              .style('fill', function(d) {
                  return d.closedChildren ? 'lightsteelblue' : '#fff';
              });

        var nodeText = nodeEnter.append('text')
            .attr('x', function(d) {
                return d.children || d.closedChildren ? -10 : 10;
            })
            .attr('dy', '.35em')
            .attr('class', 'nodeText')
            .attr('text-anchor', function(d) {
                return d.children || d.closedChildren ? 'end' : 'start';
            })
            .text(function(d) {
                return d.name;
            })
            .style('fill-opacity', 0);

        // phantom node to give us mouseover in a radius around it
        nodeEnter.append('circle')
            .attr('class', 'ghostCircle')
            .attr('r', 30)
            //.attr('opacity', 0.2) // change this to zero to hide the target area
        .style('fill', 'red')
            .attr('pointer-events', 'mouseover')
            .on('mouseover', function(onMouseOverNode) {
                overCircle(onMouseOverNode);
            })
            .on('mouseout', function(onMouseOutNode) {
                outCircle(onMouseOutNode);
            });

        // Update the text to reflect whether node has children or not.
        node.select('text')
            .attr('x', function(d) {
                return d.children || d.closedChildren ? -10 : 10;
            })
            .attr('text-anchor', function(d) {
                return d.children || d.closedChildren ? 'end' : 'start';
            })
            .text(function(d) {
                return d.name;
            });

        // Change the circle fill depending on whether it has children and is collapsed
        node.select('circle.nodeCircle')
            .attr('r', 4.5)
            .style('fill', function(d) {
                //return d.closedChildren ? 'lightsteelblue' : '#fff';
                return getFillColor(d);
            })
            .style('stroke', function(d) {
                return getStrokeColor(d);
            })

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr('transform', function(d) {
                return 'translate(' + d.y + ',' + d.x + ')';
            });

        // Fade the text in
        nodeUpdate.select('text')
            .style('fill-opacity', 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr('transform', function(d) {
                return 'translate(' + source.y + ',' + source.x + ')';
            })
            .remove();

        nodeExit.select('circle')
            .attr('r', 0);

        nodeExit.select('text')
            .style('fill-opacity', 0);

        // Update the links…
        var link = svgGroup.selectAll('path.link')
            .data(links, function(d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert('path', 'g')
            .attr('class', 'link')
            .attr('d', function(d) {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr('d', diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr('d', function(d) {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Append a group which holds all nodes and which the zoom Listener can act upon.
    var svgGroup = baseSvg.append('g');

    // Define the root
    root = treeData;
    root.x0 = viewerHeight / 2;
    root.y0 = 0;

    // Layout the tree initially and center on the root node.
    update(root);
    centerNode(root);
}
