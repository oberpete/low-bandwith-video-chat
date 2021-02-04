import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#015249',
            primaryAccent1: '#739793',
            primaryAccent2: '#aabab8',
            primaryAccent3: '#d9dcdc',
            linen: '#cfcabc',
            linenDarker: '#C4BDAC',
            linenLighter: '#e1ded5',
            linenLighter2: '#F9F5F0',
            secondary:  '#25182c',
            accent: '#3F51B5',
            background: '#aabab8'
          },
        },
    }
});
