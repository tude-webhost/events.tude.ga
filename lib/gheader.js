window._header = [
    {
        'name': 'Club',
        'url': 'club',
        'elements': [
            { name: 'Tude Club', url: 'https://tude.ga/club'                        },
            { name: 'Arcade',    url: 'https://tude.ga/arcade'                      },
            { name: 'Events',    url: '.'                      },
            { name: 'Discord',   url: 'http://discord.tude.ga/'       }
        ]
    },
    {
        'name': 'Games',
        'url': 'games',
        'elements': [
            { name: 'Linjo',     url: 'https://tude.ga/linjo'                       },
            { name: 'All Games', url: 'https://tude.ga/games'                       }
        ]
    },
    {
        'name': 'More',
        'url': 'more',
        'elements': [
            { name: 'About',     url: 'https://tude.ga/about'                       },
            { name: 'Tude Bot',  url: 'https://tude.ga/tudebot'                     },
            { name: 'Contact',   url: 'mailto:tudeteam@gmail.com'     },
            { name: 'Legal',     url: 'https://tude.ga/legal'                       },
            { name: 'Even More', url: 'https://tude.ga/more'                        }
        ]
    }
]

Vue.component('gheaderd-element', {
    props: [ 'name', 'url' ],
    template: `
    <li class="moreListItem">
        <a class="moreListLink" :href="url">
            {{ name }}
            <i v-if="isExternal()" class="fas fa-external-link-square-alt headerLinkExtern" title="External Link"></i>
        </a>
    </li>
    `,
    methods: {
        isExternal: function() { return this.url.startsWith('http'); }
    }
});

Vue.component('gheaderd-category', {
    props: [ 'name', 'elements', 'url', 'theme' ],
    template: `
    <li>
        <a :href="url"><span class="navLink">
            {{ name }}
            <img :src="getDropdown" class="navMore">
        </span></a>
        <ul class="moreList">
            <gheaderd-element v-for="element in elements" :key="element.name" :name="element.name" :url="element.url"></gheaderd-element>
        </ul>
    </li>
    `,
    computed: {
        getDropdown() {
            switch(this.theme) {
                case 'light': return './assets/dropdown_white.svg';
                default: return './assets/dropdown_black.svg';
            }
        }
    }
});

Vue.component('gheader', {
    props: [ 'theme' ],
    template: `
    <header :theme="theme">
        <div class="header desktopHeader">
            <div class="headerInner">
                <div class="headerLogo"><a href="https://tude.ga/"><img :src="getLogo"></a></div>
                <ul class="headerNav">
                    <gheaderd-category v-for="category in _header" :key="category.name" :name="category.name" :elements="category.elements" :url="category.url" :theme="theme"></gheaderd-category>
                </ul>
            </div>
        </div>
        <div class="header mobileHeader">Oh SHIT</div>
    </header>
    `,
    computed: {
        getLogo() {
            switch(this.theme) {
                case 'light': return './assets/logo_white.svg';
                default: return './assets/logo_black.svg';
            }
        }
    }
});