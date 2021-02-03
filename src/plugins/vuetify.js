import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#10564F',
            primaryAccent1: '#16796F',
            primaryAccent2: '#6CB0A8',
            primaryAccent3: '#ADC9C5',
            linen: '#cfcabc',
            linenDarker: '#C4BDAC',
            linenLighter: '#e1ded5',
            secondary:  '#FFCDD2',
            accent: '#3F51B5'
          },
        },
    }
});
