import React from 'react'

const AdmissionForm = ({ form }) => {
    <div>
      <p>lomakkeen tunnus: {form.id}</p>
      {form.name}
      {form.lastname}
      {form.identificationNumber}
      {form.address}
      {form.location}
      {form.processAddress}
      {form.trustee}
      {form.citizenship}            
      {form.admissionNoteSendingOrganization}
      {form.admissionNoteSender}
      {form.sendersEmail}
      {form.sendersPhonenumber}
      {form.hazardAssessment}
      {form.diaariNumber}
      {form.datePrescribedForPsychiatricAssessment}
      {form.nativeLanguage}
      {form.desiredLanguageOfBusiness}
      {form.municipalityOfResidence}
      {form.prosecuted}
      {form.deadlineForProsecution}
      {form.preTrialPoliceDepartment}
      {form.emailFromTheDirectorOfInvestigation}
      {form.phonenumberFromTheDirectorOfInvestigation}
      {form.addressFromTheDirectorOfInvestigation}
      {form.crime}
      {form.crimes}
      {form.assistantsEmail}
      {form.assistantsPhonenumber}
      {form.assistantsAddress}
      {form.legalGuardianEmail}
      {form.legalGuardianPhonenumber}
      {form.legalGuardianAddress}
      {form.legalGuardianInstitute}
      {form.appealedDecision}
    </div>
}

export default AdmissionForm