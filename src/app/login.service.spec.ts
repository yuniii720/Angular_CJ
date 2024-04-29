import LoginService from '../../src/app/login.service'; 

describe('LoginService', () => {
  let service: typeof LoginService;

  beforeEach(() => {
    service = LoginService; 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
