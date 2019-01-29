import { WcpsModule } from './wcps.module';

describe('ReportModule', () => {
    let wcpsModule: WcpsModule;

    beforeEach(() => {
        wcpsModule = new WcpsModule();
    });

    it('should create an instance', () => {
        expect(WcpsModule).toBeTruthy();
    });
});
