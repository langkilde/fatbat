/* tslint:disable:interface-over-type-literal no-namespace */

export namespace Store {
  
  export type Login = {
    authenticated: boolean,
    userId?: string,
    token?: string,
  };
  
  export type Menu = {
    isActive: boolean,
  };
  
  export type Profile = {
    name: string,
    avatar: string,
  };
  
  export type All = {
    login: Login,
    menu: Menu,
    profile: Profile,
  };
  
}
