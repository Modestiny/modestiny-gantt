import Gantt from './components/gantt.vue';
import 'element-plus/dist/index.css'

Gantt.install = (App: any) => {
    App.component(Gantt.__name, Gantt);
}

export default Gantt