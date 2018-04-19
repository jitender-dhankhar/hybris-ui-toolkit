'use strict';

// modules
var assemble = require('fabricator-assemble');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var path = require('path');
 

gulp.task('minify-script', function() {
    return gulp.src([
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/generatedVariables.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery-3.2.1.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/bootstrap-3.3.7/dist/js/bootstrap.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/enquire.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/Imager.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.blockUI-2.66.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.colorbox-min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.form.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.hoverIntent.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.pstrength.custom-1.2.0.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.syncheight.custom.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.tabs.custom.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery-ui-1.12.1.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.zoom.custom.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/owl.carousel.custom.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.tmpl-1.0.0pre.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.currencies.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.waitforimages.min.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/common/jquery.slideviewer.custom.1.2.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.address.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.autocomplete.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.carousel.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.cart.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.cartitem.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.checkout.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.checkoutaddress.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.checkoutsteps.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.cms.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.colorbox.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.common.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.forgottenpassword.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.global.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.hopdebug.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.imagegallery.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.langcurrencyselector.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.minicart.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.navigation.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.order.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.paginationsort.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.payment.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.paymentDetails.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.pickupinstore.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.product.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.productDetail.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.quickview.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.ratingstars.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.refinements.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.sanitizer.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.silentorderpost.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.tabs.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.termsandconditions.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.track.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.storefinder.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.futurelink.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.productorderform.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.savedcarts.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.multidgrid.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.quickorder.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.quote.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.consent.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/acc.csv-import.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/_autoload.js',
			'./src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/cms/*.js'
		])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/assets/web/webroot/_ui/responsive/common/js/'))
        .pipe(rename('scripts.min.js'))
    //    .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/web/webroot/_ui/responsive/common/js/'));
});

gulp.task('styles:less', function () {
  return gulp.src('./src/assets/web/webroot/WEB-INF/_ui-src/responsive/themes/alpha/less/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/assets/web/webroot/_ui/responsive/theme-alpha/css'));
});

gulp.task('styles:custom-less', function () {
	return gulp.src('./src/assets/web/webroot/WEB-INF/_ui-src/responsive/themes/custom/less/main.less')
	  .pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	  }))
	  .pipe(gulp.dest('./dist/assets/web/webroot/_ui/responsive/theme-custom/css'));
  });

gulp.task('styles:minify-css', ['styles:less'], () => {
	return gulp.src('./dist/assets/web/webroot/_ui/responsive/theme-alpha/css/*.css')
	  .pipe(cleanCSS({compatibility: 'ie8'}))
	  .pipe(gulp.dest('./dist/assets/web/webroot/_ui/responsive/theme-alpha/css'));
  });

// configuration
var config = {
	dev: gutil.env.dev,
	src: {
		scripts: {
			fabricator: './src/assets/fabricator/scripts/fabricator.js',
			toolkit: './src/assets/toolkit/scripts/toolkit.js'
		},
		styles: {
			fabricator: 'src/assets/fabricator/styles/fabricator.scss',
			toolkit: 'src/assets/toolkit/styles/toolkit.scss'
		},
		images: 'src/assets/web/webroot/WEB-INF/_ui-src/responsive/themes/alpha/images/*',
		views: 'src/toolkit/views/*.html'
	},
	dest: 'dist'
};


// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);


// clean
gulp.task('clean', function (cb) {
	del([config.dest], cb);
});


// styles
gulp.task('styles:fabricator', function () {
	gulp.src(config.src.styles.fabricator)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix('last 1 version'))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(rename('f.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest + '/assets/fabricator/styles'))
		.pipe(gulpif(config.dev, reload({stream:true})));
});

gulp.task('styles:toolkit', function () {
	gulp.src(config.src.styles.toolkit)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix('last 1 version'))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest + '/assets/toolkit/styles'))
		.pipe(gulpif(config.dev, reload({stream:true})));
});

gulp.task('styles', ['styles:fabricator', 'styles:toolkit', 'styles:less', 'styles:minify-css', 'styles:custom-less']);


// scripts
gulp.task('scripts', function (done) {
	webpackCompiler.run(function (error, result) {
		if (error) {
			gutil.log(gutil.colors.red(error));
		}
		result = result.toJson();
		if (result.errors.length) {
			result.errors.forEach(function (error) {
				gutil.log(gutil.colors.red(error));
			});
		}
		done();
	});
});


// images
gulp.task('images', ['favicon', 'fonts', 'commonImages'], function () {
	return gulp.src(config.src.images)
	//	.pipe(imagemin())
		.pipe(gulp.dest(config.dest + '/assets/web/webroot/_ui/responsive/theme-alpha/images'));
});

gulp.task('commonImages', function () {
	return gulp.src('src/assets/web/webroot/WEB-INF/_ui-src/responsive/common/images/*')
		.pipe(gulp.dest(config.dest + '/assets/web/webroot/_ui/responsive/common/images'));
});

gulp.task('favicon', function () {
	return gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.dest));
});

gulp.task('fonts', function () {
	return gulp.src('./src/assets/web/webroot/WEB-INF/_ui-src/responsive/themes/alpha/fonts/*')
		.pipe(gulp.dest(config.dest + '/assets/web/webroot/_ui/responsive/theme-alpha/fonts'));
});


// assemble
gulp.task('assemble', function (done) {
	assemble({
		logErrors: config.dev
	});
	done();
});


// server
gulp.task('serve', function () {

	browserSync({
		server: {
			baseDir: config.dest
		},
		notify: false,
		logPrefix: 'FABRICATOR'
	});

	/**
	 * Because webpackCompiler.watch() isn't being used
	 * manually remove the changed file path from the cache
	 */
	function webpackCache(e) {
		var keys = Object.keys(webpackConfig.cache);
		var key, matchedKey;
		for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			key = keys[keyIndex];
			if (key.indexOf(e.path) !== -1) {
				matchedKey = key;
				break;
			}
		}
		if (matchedKey) {
			delete webpackConfig.cache[matchedKey];
		}
	}

	gulp.task('assemble:watch', ['assemble'], reload);
	gulp.watch('src/**/*.{html,md,json,yml}', ['assemble:watch']);

	gulp.task('styles:fabricator:watch', ['styles:fabricator']);
	gulp.watch('src/assets/fabricator/styles/**/*.scss', ['styles:fabricator:watch']);

	gulp.task('styles:toolkit:watch', ['styles:toolkit']);
	gulp.watch('src/assets/toolkit/styles/**/*.scss', ['styles:toolkit:watch']);

	gulp.task('scripts:watch', ['scripts'], reload);
	gulp.watch('src/assets/{fabricator,toolkit}/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);

	gulp.task('images:watch', ['images'], reload);
	gulp.watch(config.src.images, ['images:watch']);

	gulp.task('styles:less:watch', ['styles:less']);
	gulp.watch('src/assets/web/webroot/WEB-INF/_ui-src/responsive/**/*.less', ['styles:less:watch']);

	gulp.task('styles:minify-css:watch', ['styles:minify-css']);
	gulp.watch('src/assets/web/webroot/WEB-INF/_ui-src/responsive/**/*.less', ['styles:minify-css:watch']);

	gulp.task('styles:less-custom:watch', ['styles:less-custom']);
	gulp.watch('src/assets/web/webroot/WEB-INF/_ui-src/responsive/**/*.less', ['styles:less:watch']);

	gulp.task('minify-script:watch', ['minify-script']);
	gulp.watch('src/assets/web/webroot/WEB-INF/_ui-src/responsive/lib/ybase-0.1.0/js/*.js', ['minify-script:watch']);

});


// default build task
gulp.task('default', ['clean'], function () {

	// define build tasks
	var tasks = [
		'styles',
		'scripts',
		'minify-script',
		'images',
		'assemble'
	];

	// run build
	runSequence(tasks, function () {
		if (config.dev) {
			gulp.start('serve');
		}
	});

});
