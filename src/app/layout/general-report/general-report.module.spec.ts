import { GeneralReportModule } from './general-report.module';

describe('ReportModule', () => {
    let generalReportModule: GeneralReportModule;

    beforeEach(() => {
        generalReportModule = new GeneralReportModule();
    });

    it('should create an instance', () => {
        expect(GeneralReportModule).toBeTruthy();
    });
});
