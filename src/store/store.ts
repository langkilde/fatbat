/* tslint:disable:interface-over-type-literal no-namespace */

export namespace Store {
  
  export type Auth = {
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
    auth: Auth,
    menu: Menu,
    profile: Profile,
  };
  
}
