
//This is a php file that is one of two files needed in the twentytwentyfive-child theme to create the REST endpoint in WordPress

?php
    //Step 1. Tell the WordPress API to load our partent theme's css styles

    // In 2 parts: (1) call a built-in function in WP API named add_action() that extends the WP API with customer code
    //Then, Define custom function that holds the code we are using to extend the WP API

    //add-action takes 2 arguments: string for the api hook we want to extend.
    add_action('wp_enqueue_scripts', 'enqueue_parent_styles');

    function enqueue_parent_styles() {
        //Inside this function, we call another built-in function in WP API named wp_enqueue_style()
        //This function loads a CSS stylesheet into our theme

        //wp_enqueue_style() takes 2 arguments:
        //(1) a string handle for the stylesheet we want to load
        //(2) the location of the stylesheet we want to load

        wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    }

    //Step 2: Tell SP API to register a new REST url endpoint
    // In 2 parts:  (1) Call built-in add_action() to extend the WP API with customer code
    add_action('rest_api_init', 'register_custom_endpoint');

    // Add our customer function to register the new REST endpoint URL
    function register_custom_endpoint() {
        //Inside this function, we call another built-in function in WP API named register_rest_route()
        //This function registers a new REST endpoint URL with the WP API

        //register_rest_route() takes 3 arguments:
        //(1) a string namespace for the new endpoint
        //(2) a string route for the new endpoint
        //(3) an array of options for the new endpoint

        register_rest_route('twentytwentyfive-child/v1', '/latest-posts/(?P<category_id>\d+)', array(
            'methods' => 'GET',
            'callback' => 'get_latest_posts_by_category'
        ));
    }

    //Step 3: Define our customer callback function that WP will run when the REST API endpoint URL we defined is received
    function get_latest_posts_by_category($request) {
        //Get the category_id value WP passes to us
        $args = array(
            'category' => $request['category_id']            
        );

        // Call the built-in function in WP API named get_posts()
        //get_posts() takes a single associative arrray as an arrgument
        $posts = get_posts($args);

        //Check to see if WP returned at least one post
        if (empty($posts)) {
            return new WP_Error('empty_category', 'No posts to display', array('status' => 404));
        }

        //If we make it to here, SP get_posts() returned at least one post
        //Let us send back the data for the found posts(s)
        $response = new WP_REST_Response($posts);
        $response->set_status(200);
        //Send back the REST response object filled up with all of the posts we found
        return $response;
    }

?>