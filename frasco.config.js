module.exports = {
  port: 4000,

  tasks: {
    browsersync: true,
    eslint: true,
    imagemin: true,
    sass: true,
    styleLint: true,
    watch: true,
    webpack: true
  },

  assets: './assets',

  browsersync: {
    browsers: [
      // "Google Chrome Canary",
      // "Google Chrome",
      // "Firefox Nightly",
      // "Firefox Developer Edition",
      // "Firefox",
      // "Safari Technology Preview",
      // "Safari",
      // "Opera",
      // "Opera Developer",
    ]
  },

  eslintLoader: {
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  },

  imagemin: {
    src: '_images',
    dest: 'images',
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }]
  },

  jekyll: {
    config: {
      default: '_config.yml',
      development: '_config_development.yml',
      production: ''
    },
    dest: '_site',
    includes: '_includes',
    layouts: '_layouts',
    posts: '_posts'
  },

  js: {
    src: '_js',
    dest: 'js',
    entry: ['bundle.js', 'main.js', 'navigation.js']
  },

  sass: {
    src: '_sass',
    dest: 'css',
    outputStyle: 'compressed',
    autoprefixer: {
      grid: 'autoplace',
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }
  },

  webpack: {
    mode: 'production',
    module: {
      rules: []
    }
  },
  externals: {
    TimelineMax: 'TimelineMax',
    TweenMax: 'TweenMax',
    Barba: 'Barba'
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      TweenLite: 'gsap/src/minified/TweenLite.min.js',
      TweenMax: 'gsap/src/minified/TweenMax.min.js',
      TimelineLite: 'gsap/src/minified/TimelineLite.min.js',
      TimelineMax: 'gsap/src/minified/TimelineMax.min.js',
      Barba: 'barba.js/dist/barba.min.js',
      anime: 'animejs/lib/anime.es.js'
    }
  }
}
