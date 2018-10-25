var api = {
    baseApiUrl: 'http://api-19feb.herokuapp.com/',
    localApiUrl: 'http://localhost:2300/'
};
var thirdPartyServicesJsonArray = [
    {
      name: 'Google Play Services',
      model: 'gps',
      gps: true,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/gps.png',
      link: {
        privacy: 'https://www.google.com/policies/privacy/',
        terms: ''
      }
    },
    {
      name: 'AdMob',
      model: 'admob',
      admob: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/admob.png',
      link: {
        privacy: 'https://support.google.com/admob/answer/6128543?hl=en',
        terms: ''
      }
    },
    {
      name: 'Firebase Analytics',
      model: 'firebase',
      firebase: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/firebase.png',
      link: {
        privacy: 'https://firebase.google.com/policies/analytics',
        terms: ''
      }
    },
    {
      name: 'Firebase',
      model: 'firebase_privacy',
      firebase: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/firebase.png',
      link: {
        privacy: 'https://firebase.google.com/support/privacy/',
        terms: ''
      }
    },
    {
      name: 'Firebase Indexing ',
      model: 'firebase_indexing',
      firebase: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/firebase.png',
      link: {
        privacy: 'https://firebase.google.com/policies/app-indexing/',
        terms: ''
      }
    },
    {
      name: 'Facebook',
      model: 'facebook',
      facebook: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/facebook.png',
      link: {
        privacy: 'https://www.facebook.com/about/privacy',
        terms: ''
      }
    },
    {
      name: 'Fabric',
      model: 'fabric',
      fabric: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/fabric.png',
      link: {
        privacy: 'https://fabric.io/privacy',
        terms: ''
      }
    },
    {
      name: 'Crashlytics',
      model: 'crashlytics',
      crashlytics: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/crashlytics.png',
      link: {
        privacy: 'http://try.crashlytics.com/terms/privacy-policy.pdf',
        terms: ''
      }
    },
    {
      name: 'Matomo',
      model: 'piwik',
      piwik: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/piwik.png',
      link: {
        privacy: 'https://matomo.org/privacy-policy/',
        terms: ''
      }
    },
    {
      name: 'Clicky',
      model: 'clicky',
      clicky: false,
      logo: 'https://app-privacy-policy-generator.firebaseapp.com/images/clicky.png',
      link: {
        privacy: 'https://clicky.com/terms#privacy',
        terms: ''
      }
    }
  ]
var untilFn = {
    convertHtmlToMd: (html) => {
        let markdown = toMarkdown(html, {
            converters: [
                {
                    filter: 'div',
                    replacement: function (content) {
                        return content
                    }
                }
            ]
        })
        return markdown
    },
    getRawHTML: (content, title) => {
        let html =
            "<!DOCTYPE html>\n\
          <html>\n\
          <head>\n\
            <meta charset='utf-8'>\n\
            <meta name='viewport' content='width=device-width'>\n\
            <title>" +
            title +
            "</title>\n\
            <style> body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style>\n\
          </head>\n\
          <body>\n\
          " +
            content +
            '\n\
          </body>\n\
          </html>\n\
            '
        return html
    },
    getContent: (id) => {
        var content = document.getElementById(id)
        return content.innerHTML
    },
    getTitle: (id) => {
        var content = document.getElementById(id)
        var title = content.getElementsByTagName('h2')[0]
        return title.innerHTML
    },
    selectText: (containerId) => {
        var range
        if (document.selection) {
            range = document.body.createTextRange()
            range.moveToElementText(document.getElementById(containerId))
            range.select()
        } else if (window.getSelection) {
            range = document.createRange()
            range.selectNode(document.getElementById(containerId))
            window.getSelection().addRange(range)
        }
    },
    download: (filename, text, format) => {
        format += ';charset=utf-8,'
        var pom = document.createElement('a')
        pom.setAttribute('href', format + encodeURIComponent(text))
        pom.setAttribute('download', filename)

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents')
            event.initEvent('click', true, true)
            pom.dispatchEvent(event)
        } else {
            pom.click()
        }
    },
    downloadHTML: (filename, content) => {
        filename += '.html'
        untilFn.download(filename, content, 'data:text/html')
    },
    downloadMD: (filename, content) => {
        filename += '.md'
        untilFn.download(filename, content, 'data:text/markdown')
    }
}
module.exports.baseApi = api;
module.exports.thirdPartyServicesJsonArray = thirdPartyServicesJsonArray;
module.exports.untilFn = untilFn;