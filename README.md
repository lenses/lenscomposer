What is Lenses?
===============

Lenses is a web toolkit that enables the rapid creation of sophisticated
data visualizations and interactive graphics. It’s unique because it
scales with the person as their knowledge advances. No knowledge of
programming is required to get started but the toolkit can be extended
and completely customized by developers using HTML and Javascript. 

There are 2 parts to the project:
=================================

The open source web components
A canonical implementation of how the web components would function
together which we call the Lens Composer

It’s built around the following core ideas: 

- Open source web components which each serve a specific function and can
be connected together to grab data from various sources, including APIs
that are not accessible to non-programmers in order to transform it from
it’s raw form into graphics for the web. 
- Extensibility by allowing developers to add new components using HTML,
JS, and CSS.
- Data provenance by saving and publishing the workspace used to create
the Lens.
- Exploration and publishing are a single step done by a single tool all
in the web browser. This shortens the feedback cycle between ideas and
results. 

Why did we build yet another data viz tool?
===========================================

There are many data viz tools, unfortunately they all focus on doing
very simple graphs and so do not meet the requirements of practitioners
in the field, and tie the user to their ecosystem or they require
various levels of coding knowledge to create the graphs and integrate
them to be published on the web.

Lenses solves both of these issues. It’s easy to get started with it
through the drag-and-drop interface and scales up to users who would
prefer to create their own unique data visualizations using code.
How does it work

It consists of new HTML tags created using web components that can be
connected together to fetch, manipulate, and visualize data. 

Why use Lenses?
===============

 It only requires knowledge of javascript and builds on top of the work
 of others through the ability to communicate with any RESTful API for
 data manipulation. That means it is not constrained to any particular
 toolset you can mix google graphs with high chart graphs and do linear
 regressions using R studio as long as a web components exists for that.
 In addition, the value of toolset grows as the community using it
 expands. Once a new web component is added it can be used by anyone. So
 if you want to pull data from the twitter api you can use the component
 for that, run it through a clustering algorithm and show it on a google
 graph, all without writing any code. 

How does this help me if I’m a programmer that makes their own data viz?
========================================================================

 Only write code to do unique things and skip the boiler plate. It’s the
 same as using libraries except web components are mark-up so they are
 simpler to use and can be manipulated visually in the browser. In
 addition, the code that you write for new web components is
 automatically evaluated in the browser so you shorten the feedback loop
 between writing code and getting results so you can build better more
 interesting things.

Who are the initial target users?
=================================

 Interactive graphics journalists who are familiar with HTML, CSS, JS
 and basic data manipulation for creating data viz.

How can I contribute?
=====================

 Run the script at github.com/lenses/script to get the environment set
 up and follow the guidelines to add new web components.

