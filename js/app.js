var App = (function() {

    function App() {
        var _public = this;
        var _private = {};

        /* ********** public ********** */
        /// Google Analyticsのアカウント
        _public.googleAnalyticsAccount = '';

        /**
         * run
         */
        _public.run = function () {
            _private.loadGoogleAnalytics()
                .fail(function () { });
        };


        /* ********** private ********** */
        /**
         * Google Analyticsの遅延ロード
         */
        _private.loadGoogleAnalytics = function () {
            var dfd = jQuery.Deferred();
            // google analytics async
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', _public.googleAnalyticsAccount]);
            _gaq.push(['_trackPageview']);
            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                dfd.resolve();
            })();
            return dfd.promise();
        };

    }

    var _static_public = App;
    var _static_private = {};

    return App;
})();
