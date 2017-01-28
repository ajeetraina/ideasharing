/*!
 * WP Idea Stream Featured images script
 * A tinyMCE plugin to list inserted images
 */

;
( function($) {
	if ( ! $( '#idea-images-list' ).length || 'undefined' === typeof tinymce ) {
		return;
	}

	// Now it's a radiocheck!
	$( '#idea-images-list' ).on( 'click', ':checkbox', function( event ) {
		$( '#idea-images-list :checked' ).each( function() {
			if ( $( this ).val() !== $( event.target ).val() ) {
				$( this ).prop( 'checked', false );
			}
		} );
	} );

	tinymce.PluginManager.add( 'wpIdeaStreamListImages', function( editor ) {

		// Wait till editor is inited
		editor.on( 'init', function() {
			// Listen to Image Tiny MCE Plugin form submit
			editor.on( 'wpImageFormSubmit', function( event ) {
				var is_in  = 0, image = event.imgData;
					output = $( '<li></li>' ).html( '<img src="' + image.data.src + '"/><div class="cb-container"><input type="checkbox" name="wp_idea_stream[_the_thumbnail][' + image.data.src + ']" value="' + image.data.src + '"/></div>' );

				// Display the container
				if ( $( '#idea-images-list' ).hasClass( 'hidden' ) ) {
					$( '#idea-images-list' ).removeClass( 'hidden' );
				} else {
					$( '#idea-images-list :checkbox' ).each( function( i, cb ) {
						/**
						 * The value of src can be different although image are the same.
						 * Once an image is saved as an attachment, we need to use the original
						 * image url as the index of the name attribute and compare it with
						 * the inserted image
						 */
						var match_src = $( cb ).prop( 'name' ).match( /wp_idea_stream\[_the_thumbnail\]\[(.*)\]/ );

						if ( match_src && image.data.src === match_src[1] ) {
							is_in += 1;
						}
					} );
				}

				// Insert the image in it...
				if ( ! $( '#idea-images-list ul' ).length ) {
					$( '#idea-images-list label' ).after( $( '<ul></ul>' ).html( output ) );

				// ... only if it's not already in!
				} else if ( 0 === is_in ) {
					$( '#idea-images-list ul' ).append( output );
				}

				is_in = 0;
			} );
		} );
	} );
} )( jQuery );
