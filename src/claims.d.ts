declare namespace server {
  type URI = string;
  
  type IdentityRequestData = {
    claims: Claim[];
    connectionID: string;
  }

  interface Claim {
    "@context": string[];
    id?: URI;
    key: string;
    title: string;
    description?: string;
    type: URI[];
    credentialSubject: CredentialSubject;
    proof: Proof;
    issuer: URI;
    issuanceDate: Date;
    expirationDate?: Date;
    credentialSchema?: CredentialSchema;
    refreshService?: RefreshService;
    termsOfUse?: TermsOfUse;
    evidence?: Evidence[];
  }

  interface CredentialSubject {
    id?: URI;
    name: URI;
    value: any;
  }

  interface Proof {
    type: URI;
  }
  
  interface CredentialStatus {
    id?: URI;
    type: URI
  }

  interface CredentialSchema {
    id?: URI;
    type: URI;
  }

  interface RefreshService {
    id?: URI;
    type: URI;
  }

  interface TermsOfUse {
    id?: URI;
    type: URI;
    obligation?: any;
    prohibition?: any;
    permission?: any;
  }

  interface Evidence {
    id?: URI;
    type: URI[];
    verifier: URI;
    evidenceDocument: string;
    subjectPresence: string;
    documentPresence: string;
  }
}
