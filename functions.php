<?php

if (!class_exists( 'Timber')) {
	$message = '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	add_action('admin_notices', function() use ($message) {
		echo $message;
	});
	add_filter('template_include', function($template) use ($message) {
    die($message);
	});
	return;
}

Timber::$dirname = array('views');

class MySite extends TimberSite {

	function __construct() {
		add_theme_support('post-formats');
		add_theme_support('post-thumbnails');
		add_theme_support('menus');

    add_filter('timber_context', array($this, 'add_to_context'));
		add_filter('get_twig', array($this, 'add_to_twig'));
		add_filter('acf/settings/save_json', array($this, 'configure_acf_save'));
		add_filter('acf/settings/load_json', array($this, 'configure_acf_load'));

    add_action('admin_menu', array($this, 'configure_admin_menu'));
    add_action('init', array($this, 'load_plugins'));
    add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));

		parent::__construct();
	}

	function register_post_types() {
		// Register custom post types here.
	}

	function register_taxonomies() {
    // Register taxonomies here.
	}

  function configure_admin_menu() {
		if(!current_user_can('manage_options')) {
      // Configure the admin menu here.
		}
	}

  function load_plugins() {
    // Load plugins here. Example:
    // include_once(TEMPLATEPATH . '/plugins/my-plugin.php');
  }

  function configure_acf_save($path) {
    $path = __DIR__ . '/config/acf-json';
    return $path;
	}

	function configure_acf_load($paths) {
    unset($paths[0]);
    $paths[] = __DIR__ . '/config/acf-json';
    return $paths;
	}

	function add_to_context( $context ) {
		$context['site'] = $this;
		return $context;
	}

	function add_to_twig( $twig ) {
		// Add custom Twig extensions here.
		$twig->addExtension( new Twig_Extension_StringLoader() );
		return $twig;
	}

}

new MySite();
