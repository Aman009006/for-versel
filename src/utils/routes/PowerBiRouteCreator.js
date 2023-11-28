import Layout from '@/layout/index.vue'
import Reporting from '@/views/reporting/index.vue'
import { paths } from '@/constants'
import user from '@/store/modules/user'

export default class PowerBiRouteCreator {
    constructor() {
        this.customer = user.state.metainfo.customer;
        this.reportId = user.state.metainfo.powerBI_reportID;
    }

    /**
     * @return the route which redirects at the given PowerBI URL.
     */
    createRouteForPowerBIReport() {
        const powerBIReportRoute = {
            path: '/reporting',
            component: Layout,
            children: [
                {
                    path: paths.reporting,
                    component: Reporting,
                    props: { customer: this.customer, powerBiReportId: this.reportId },
                    name: 'Reporting',
                    meta: {
                        title: 'Reporting',
                        icon: 'dashboard',
                    },
                },
            ],
        }
        if (this.reportId !== undefined && this.reportId !== null && this.reportId !== '') {
            return powerBIReportRoute
        } else {
            return null
        }
    }
}