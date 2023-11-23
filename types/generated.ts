export declare type Scalars = {
    ID: string | number;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
  };
  
  export declare type LoginUser = {
    email: Scalars["String"];
    // phoneNumber: Scalars["String"];
    password: Scalars["String"];
  };
  
  export declare type SignupUser = {
    phoneNumber: Scalars["String"];
    password: Scalars["String"];
    fullName: Scalars["String"];
    email: Scalars["String"];
    gender: Scalars["String"];
  };
  
  export declare type VerifyTokenType = {
    token: Scalars["String"];
  };
  
  export declare type ErrorResponseType = {
    error: any;
  };
  
  // In generated.ts
  // In generated.ts
  export declare type CreateActivitiesType = {
    name: string; // Update to accept a single string
    credit: number; // Update to accept a single number
    description: string; // Update to accept a single string
    companyId: Scalars["String"];
    participant: Scalars["String"];
  };
  
  
  
  
  
  
  // export declare type User = {
  //   id: Scalars["String"];
  //   username: Scalars["String"];
  //   // Other user properties
  // };
  
  // export declare type UserWithAccessToken = User & {
  //   accessToken: string;
  // };
  
  
  export declare type ActivitiesType = {
    id: Scalars["ID" ];
    image: Scalars["String"];
    title: Scalars["String"];
    description: Scalars["String"];
    participant: Scalars["String"];
    pointsImage: Scalars["String"];
  };
  
  export declare type SignupType = {
    fullName: Scalars["String"];
    email: Scalars["String"];
    phone: Scalars["String"];
    gender: Scalars["String"];
    password: Scalars["String"];
    confirmPassword: Scalars["String"];
  };
  