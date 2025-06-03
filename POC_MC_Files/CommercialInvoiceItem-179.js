
//Script id : Declaration
var _alertMsgBlinkId = null;
var _conBlinkId = null;
var _priceAlertMsgBlinkid = null;
var TokenID = 0;


function CallImporterLicensePopup(mode) {
    var ConsigneeType = '';
    var sBaseForm = ''
    if (mode == 'View') {
        ConsigneeType = MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeType');
        sBaseForm = 'ImporterLicenseView';
    }
    else {
        ConsigneeType = HtmlElementById("ConsigneeType").value;
        sBaseForm = 'ImporterLicenseForm';
    }

    if (ConsigneeType == '') {
        ShowFormException(frm.formexception.value, msgDictionary('consigneerequired'), 'DateLastSet');
    } else if (ConsigneeType == 'o') {

        var StateId = 'OrgImporterLicenseActivatedState';
        var sORgId = HtmlElementById("ConsigneeId").value;
        //frm.ConsigneeId.value
        var sCriteria = sORgId;
        LockupScreen(sBaseForm, 'DeclOrgImporterLicenseLsPg', 'ListOrgImporterLicense', sCriteria, 700, 400, false, false);
        return false;
    }
}
function HideImporterLicenseDetails() {
    var pageid = getParameter('pageid', '');
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId');
    var sOrganizationType = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@OrganizationTypeId');
    var sBillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    var sDeclNumber = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationNumber', '');
    if (sBillType == global_BillType.Import) {

        if (sOrganizationType != GBL_Types.ORGANIZATIONS.IMPORTER) {
            if (HtmlElementById("Row_ImpLicNumber") != null)
                HtmlElementById("Row_ImpLicNumber").style.display = "none";
        }
        else {
            if ((sStateId != 'DeclarationCreatedState' && sStateId != 'DutyCalculatedState' && sStateId != 'DeclarationRejected' && sStateId != 'DeclarationModifiedState')) {
                if (HtmlElementById("Cell_OrgImpLicensebrowsebutton") != null)
                    HtmlElementById("Cell_OrgImpLicensebrowsebutton").style.display = "none";
                if (HtmlElementById("OrgImpLicensebrowsebutton") != null)
                    HtmlElementById("OrgImpLicensebrowsebutton").style.display = "none";
            }
        }
    }
    else {
        if (HtmlElementById("Row_ImpLicNumber") != null)
            HtmlElementById("Row_ImpLicNumber").style.display = "none";
    }

    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    if (sCCPId == GBL_CustomsControlProcedures.AIRPORT.IMPORT_BILL.AIR_BWHInbound || sCCPId == GBL_CustomsControlProcedures.SEAPORT.IMPORT_BILL.SEA_BWHInbound) {
        if (HtmlElementById("consigneebrowsebutton") != null)
            HtmlElementById("consigneebrowsebutton").disabled = true;
    }
    else {
        if (HtmlElementById("consigneebrowsebutton") != null)
            HtmlElementById("consigneebrowsebutton").disabled = false;
    }

}


function GetImportLicenseDetails() {
    var sORgId = MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeId', '');
    var pageid = getParameter('pageid', '');
    var sConsigneeType = (pageid != 'ViewSAD' && pageid != 'ViewDeclarationExportBill' && pageid != 'ViewTransitBillSAD') ? HtmlElementById("ConsigneeType").value : MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeType', '');
    var sConsigneeId = HtmlElementById("ConsigneeId").value;
    var sFlag = true;

    MCsetAttribute("data/Declarationsrecords/Declarations/@ImporterLiceinceId", HtmlElementById("hdImporterLiceinceId").value);
    return sFlag;
}


function GetImportLicenseDetailsOld() {
    var sImportLicenseId = MCgetAttribute('data/Declarationsrecords/Declarations/@ImporterLicenseId', '');
    var pageid = getParameter('pageid', '');
    var sConsigneeType = (pageid != 'ViewSAD' && pageid != 'ViewDeclarationExportBill' && pageid != 'ViewTransitBillSAD') ? HtmlElementById("ConsigneeType").value : MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeType', '');
    var sConsigneeId = HtmlElementById("ConsigneeId").value;
    var sFlag = true;
    if (sConsigneeType == 'o' && HtmlElementById("hdImporterLiceinceId").value == '') {
        sCriteria = sConsigneeId;
        var sInXml = '<OrgImporterLicenserecords />';
        var myReq = new SilentActionCall('ListOrgImporterLicense', sCriteria, CallBackGetImporterLiceinceDetails, sInXml, 'servicedocument', 'actionservice/actioncontrol');
        myReq.StartRequest();
        myReq = null;
    }
    else if (HtmlElementById("hdImporterLiceinceId").value != '') {
        MCsetAttribute("data/Declarationsrecords/Declarations/@ImporterLicenseId", HtmlElementById("hdImporterLiceinceId").value);
    }
    function CallBackGetImporterLiceinceDetails(xmlRes) {
        var sItemcount = '';
        var OrgImporterCount = '';
        var IsImporter = 'N';
        var sExistingImporterLicId = '';
        if (xmlRes[0].parentNode.selectSingleNode("//actionservice/actioncontrol/@IsImporter") != null)
            IsImporter = xmlRes[0].parentNode.selectSingleNode("//actionservice/actioncontrol/@IsImporter").value;
        if (IsImporter == 'N')
            sFlag = true;
        else {
            HtmlElementById("Row_ImpLicNumber").style.display = "";
            if (xmlRes[0].parentNode.selectSingleNode("//actionservice/actioncontrol/@OrgImporterLicenseId") != null)
                HtmlElementById("hdImporterLiceinceId").value = xmlRes[0].parentNode.selectSingleNode("//actionservice/actioncontrol/@OrgImporterLicenseId").value;
            if (xmlRes[0].parentNode.selectSingleNode("//actionservice/actioncontrol/@OrgImporterLicenseNumber") != null)
                HtmlElementById("lblImpLicNumber").innerText = xmlRes[0].parentNode.selectSingleNode("//actionservice/actioncontrol/@OrgImporterLicenseNumber").value;
            if (HtmlElementById("hdImporterLiceinceId").value == '') {
                alert(msgDictionary('errSelectValidLicNumber'));
                sFlag = false;
            }
        }
        MCsetAttribute("data/Declarationsrecords/Declarations/@ImporterLicenseId", HtmlElementById("hdImporterLiceinceId").value);
    }
    return sFlag;
}



function HideAndShowUploadLinks() {
    var sCCRId = MCgetAttribute('data/Declarationsrecords/DeliveryOrdersrecords/DeliveryOrders/@CCRequestId', '');
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');

    var sDeclOwnerOrgId = MCgetAttribute('data/Declarationsrecords/Declarations/@OwnerOrgId', '');
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    var IsAirDRBayan = false;

    if (sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT)
        IsAirDRBayan = true;


    if (IsAirDRBayan && sDeclOwnerOrgId != GBL_Organizations.CUSTOMS.KUWAIT_CUSTOMS) {

        if (IsRoleExist("DR Broker")) {
            if (HtmlElementById('lnkCCRUploadDoc') != null)
                HtmlElementById('lnkCCRUploadDoc').style.display = '';
            if (HtmlElementById('lnkCCRvwuploadDoc') != null)
                HtmlElementById('lnkCCRvwuploadDoc').style.display = 'none';
        }
        else {
            if (HtmlElementById('lnkCCRUploadDoc') != null)
                HtmlElementById('lnkCCRUploadDoc').style.display = 'none';
            if (HtmlElementById('lnkCCRvwuploadDoc') != null)
                HtmlElementById('lnkCCRvwuploadDoc').style.display = '';
        }
    }

    else {
        if (HtmlElementById('lnkCCRUploadDoc') != null)
            HtmlElementById('lnkCCRUploadDoc').style.display = 'none';
        if (HtmlElementById('lnkCCRvwuploadDoc') != null)
            HtmlElementById('lnkCCRvwuploadDoc').style.display = 'none';
        if (HtmlElementById('linksCCRrow') != null)
            HtmlElementById('linksCCRrow').style.display = 'none';

    }
}

function openCCRUploadDocument() {
    var sDeclId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');

    if ((IsRoleExist("DR Broker") || IsRoleExist("DirectReleaseAuditor")) && (sStateId == 'DeclarationCreatedState' || sStateId == 'DeclarationModifiedState' || sStateId == 'DutyCalculatedState' || sStateId == 'DeclarationRejected' || sStateId == 'DeclarationStartState')) {
        _GetDMSFromMVC('Form', 'CourierDocuments');
    }
    else {
        _GetDMSFromMVC('View', 'CourierDocuments');
    }
}



//Call the OGD Response Dashboard Report
//added by sathya for checking  DDt Duty amount 23/5/2018 start
function CHKPrintValidation() {
    var sDutyAmount = '';
    var sInXml = xmlServiceDocument.selectSingleNode(rootNodeName + "/" + dataNodeName + "/Declarationsrecords");
    sInXml = OuterXML(sInXml);
    var myReq = new SilentActionCall('CheckMaqasaDuty', '', CallingCHKPrintValidation, sInXml, rootNodeName + '/' + dataNodeName, 'Declarationsrecords');

    myReq.StartRequest();
    myReq = null;
    function CallingCHKPrintValidation(rtnRows) {
        if (rtnRows.length > 0) {
            var xmlObjTemp = rtnRows[0];
            if (xmlObjTemp.getAttributeNode("MaqasaDutyValue") != null && xmlObjTemp.getAttributeNode("MaqasaDutyValue").nodeValue != '')
                //   if (xmlTemp.selectSingleNode(rootNodeName + "/data/Declarationrecords").getAttribute('MaqasaDutyValue') != null)
                sDutyAmount = xmlObjTemp.getAttributeNode("MaqasaDutyValue").nodeValue;//xmlTemp.selectSingleNode(rootNodeName + "/data/Declarationrecords").getAttribute('MaqasaDutyValue');
            if (sDutyAmount == 0) {
                alert(msgDictionary('errDDTDutyZero'));
                return false;
            }
            else {
                printHiddenView('MaqasaClaimsReport', ProfileField('Declarations.DeclarationId', 'text') + '=\'' + MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', '') + '\' AND  [Dues].[DueNo] =\'' + MCgetAttribute('data/Declarationsrecords/Declarations/@DueNo', '') + '\'', '', '', '', '', '', 'A4', '2');
            }
        }
    }
}
//added by sathya for checking  DDt Duty amount 23/5/2018 end

function OpenAssessmentReports() {
    if (HtmlElementById('DeclarationId') != null) {
        var sDeclId = HtmlElementById('DeclarationId').value;
        MCsetAttribute('actionservice /actioncontrol/@templateid', sDeclId);
        LockupScreen('ViewSAD', 'AssessmentDeatilsLsPg', 'ListAssessmentDetails', ProfileField('Assessmentdetails.ReferenceId', 'text') + '=\'' + sDeclId + '\'', 1000, 850, true, false);
    }
}
function OpenRMSComplexAnalysisRequests() {
    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    var baseForm = "RMSDECL" + "~" + sStateId;
    LockupScreen(baseForm, 'ListRMSAnalysisRequestLs', 'ListRMSComplexAnalysisRequest', ProfileField('RMSComplexAnalysisRequest.ReferenceId', 'text') + '=\'' + sDeclarationId + '\'', 900, 500, true, false); return false;
    pageSubmit(null, false);
}



function HideDCVehiclesAmendedLink() {
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    var portid = MCgetAttribute('user/@LogInPortId');
    if (GBL_Locations.AmendDVAfterReleaseEnabledPorts.indexOf("," + portid + ",") > -1 && (sStateId == "DeclarationReleased" || sStateId == "DeclarationExitReleasedState") && IsRolesAvailable("ChiefInspector,InspectorSupervisor")) {
        if (HtmlElementById('Cell_AmendDeclarationVehicles') != null) HtmlElementById('Cell_AmendDeclarationVehicles').style.display = '';
        if (HtmlElementById('AmendDeclarationVehicles') != null) HtmlElementById('AmendDeclarationVehicles').style.display = '';
    }
    else {
        if (HtmlElementById('Cell_AmendDeclarationVehicles') != null) HtmlElementById('Cell_AmendDeclarationVehicles').style.display = 'none';
        if (HtmlElementById('AmendDeclarationVehicles') != null) HtmlElementById('AmendDeclarationVehicles').style.display = 'none';
    }

    var objBaseForm = MCgetAttribute("pagelets/xpagelet/@BaseFormName", null);
    if (objBaseForm == 'AdditionalDocumentPage') {
        if (HtmlElementById('DeclarationVehicles') != null) HtmlElementById('DeclarationVehicles').style.display = 'none';
    }


}


function callAmendedDeclVehiclesPopUp() {
    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    var sBillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    //LockupScreen('','ListAmendedDeclVehlPopUpPg','ListAmendedDeclarationVehicles',sDeclarationId+'~'+sStateId+'~'+sBillType,850,500,true,false);
    LockupScreen('', 'ListAmendedDeclVehlPopUpPg', 'ListAmendedDeclarationVehicles', sDeclarationId + '~' + sStateId + '~' + sBillType, 1000, 600, false, false);
}


//added by sathya People as Consignee  alert 24/7/2017 start
function _ChkPeopleasConsignee() {
    var sResponse = true;
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    var IsDRBayan = false;
    var IsConsignmentTracking = false;
    if (sCCPId == global_CustomsControlProcedures.CONSIGNMENT_TRACKING_FORM_FOR_LANDPORT) IsConsignmentTracking = true;

    if (sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT)
        IsDRBayan = true;
    if (MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeType') == 'p' && !IsDRBayan && !IsConsignmentTracking) {
        sResponse = confirm(msgDictionary('errPeopleType'), msgDictionary('yes'), msgDictionary('no'));
        (sResponse == true) ? sResponse : sResponse = false;
    }
    return sResponse;
}
//added by sathya People as Consignee  alert 24/7/2017 End


function ViewOGADashboard() {
    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId');
    var sUserId = MCgetAttribute("user/@UserId", null);
    var sLangId = MCgetAttribute('user/@LanguageId', '');
    ShowRSViewerForPage('OGAGovernmentalApprovalsDashboard', '[DeclarationOGDApp].[DeclarationId]=' + sDeclarationId + '[Users].[UserId]=' + sUserId + '[Users].[LanguageId]=' + sLangId);
    return false;
}

function showDeclarationDateAndTime() {
    var sGDExists = MCgetAttribute('data/Declarationsrecords/Declarations/@GDExists', '');
    if (sGDExists == 'True') {
        $('#GDExistAlertRow').show();
    } else {
        $('#GDExistAlertRow').hide();
    }

    var sDeclDate = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationDate', '')
    var DeclDate = sDeclDate.split('T')[0];
    var sTime = sDeclDate.split('T')[1];

    DeclDate = DeclDate.split('-')[2] + '-' + DeclDate.split('-')[1] + '-' + DeclDate.split('-')[0] + ' ' + sTime.split(':')[0] + ':' + sTime.split(':')[1];
    HtmlElementById('DeclarationDate').innerText = DeclDate;

    var sDeclStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '')
    if (sDeclStateId == "DeclarationModifiedState" || sDeclStateId == "DutyCalculatedState" || sDeclStateId == "DeclarationCreatedState" || sDeclStateId == "DeclarationRejected") {
        $("#ReadyToDist").hide();
    }
    else {
        var sDeclReadyDate = MCgetAttribute('data/Declarationsrecords/Declarations/@DecReadyDate', '')
        if (sDeclReadyDate != null && sDeclReadyDate != "") {
            var sReadyDate = sDeclReadyDate.split('T')[0];
            var sReadyTime = sDeclReadyDate.split('T')[1];

            sReadyDate = sReadyDate.split('-')[2] + '-' + sReadyDate.split('-')[1] + '-' + sReadyDate.split('-')[0] + ' ' + sReadyTime.split(':')[0] + ':' + sReadyTime.split(':')[1];
            if (HtmlElementById('DecReadyDate') != null) HtmlElementById('DecReadyDate').innerText = sReadyDate;
        }
    }



}


function hidebtnValidateDeclVehicles() {
    //Added By chandra-starts
    var sLoginPortId = MCgetAttribute('user/@LogInPortId', '');
    var DeclDate = MCgetAttribute('data/Declarationsrecords/Declarations/@DecDateCreated', '');
    DeclDate = DeclDate.split('T')[0];
    DeclDate = DeclDate.split('-')[2] + '-' + DeclDate.split('-')[1] + '-' + DeclDate.split('-')[0];

    //Added By chandra-ends
    if (!fnCheckDeclVechicleEnhancedPortsEnabled(sLoginPortId, DeclDate)) {
        if (HtmlElementById("ValidateDecVeh") != null)
            HtmlElementById("ValidateDecVeh").style.display = "none";
    }

    var sWorkload = MCgetAttribute('data/Declarationsrecords/Declarations/@Workloadenabledport', '');
    if (sWorkload != null && sWorkload != '' && sWorkload == 'N') {
        if (HtmlElementById("Delink") != null)
            HtmlElementById("Delink").style.display = "none";
    }
    else {
        if (HtmlElementById("Delink") != null)
            HtmlElementById("Delink").style.display = "";
    }

}


function BlinkAlertMsg() {
    //_alertMsgBlinkId=_startBlink('AlertMsg'); //Commented by Suhail to stop the blinking and display as a normal label
}

function hideLinksForArchivehideDecVehicle() {
    if (MCgetAttribute('data/Declarationsrecords/Declarations/@Archive', '') == '1') {
        if (HtmlElementById('prnAtt') != null) HtmlElementById('prnAtt').style.display = 'none';
        if (HtmlElementById('PrintPromissary') != null) HtmlElementById('PrintPromissary').style.display = 'none';
        if (HtmlElementById('PrintPromissaryPP') != null) HtmlElementById('PrintPromissaryPP').style.display = 'none';
        if (HtmlElementById('transactionhistory') != null) HtmlElementById('transactionhistory').style.display = 'none';
        if (HtmlElementById('paymentTransaction') != null) HtmlElementById('paymentTransaction').style.display = 'none';
        if (HtmlElementById('ContainerDetails') != null) HtmlElementById('ContainerDetails').style.display = 'none';
        if (HtmlElementById('DeclarationVehicles') != null) HtmlElementById('DeclarationVehicles').style.display = 'none';
        if (HtmlElementById('transitroute') != null) HtmlElementById('transitroute').style.display = 'none';
        if (HtmlElementById('RejectionHistory') != null) HtmlElementById('RejectionHistory').style.display = 'none';
        if (MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '') == '1343') if (HtmlElementById('lnkViewBOL') != null) HtmlElementById('lnkViewBOL').style.display = 'none';
        if (HtmlElementById('RejectDeclaration') != null) HtmlElementById('RejectDeclaration').style.display = 'none';
    }
}

function isRefExists() {

    if (MCgetAttribute('data/Declarationsrecords/Declarations/@RefDeclarationNumber', '') == '') {
        var sErrorMsg = msgDictionary('errRefLinkExists');
        alert(sErrorMsg);
        return false;
    }
    else {
        return true;
    }
}

function hideDecVehicle() {

    var sDeclarationDate = MCgetAttribute('data/Declarationsrecords/Declarations/@DecDateCreated', '');
    var sPaymentFlag = false;

    if (sDeclarationDate != null && isKNETOnlinePaymentEnabled(sDeclarationDate)) {
        sPaymentFlag = true;
    }

    if (sPaymentFlag == false) {
        if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
    }
    else {
        var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');
        var sRejCount = MCgetAttribute('data/Declarationsrecords/Declarations/@RejectCount', '0');

        if (IsRolesAvailable("ClearingAgent,ReadOnly,DR Broker,DirectReleaseAuditor,PWCSupport,Customs Operation,AuditorSupervisor,BWHClearingAgent")) {
            if (sStateId == 'DeclarationCreatedState' || sStateId == 'DeclarationCancelledState' || sStateId == 'CancelledByReqState' || (sStateId == 'DutyCalculatedState' && sRejCount <= 0)) {

                if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
            }
            else {
                if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = '';
            }
        }
        else {
            if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
        }
    }

    var isInspector = IsRoleExist("Inspector");
    var isInspectorSupervisor = IsRoleExist("InspectorSupervisor");
    var isChiefInspector = IsRoleExist("ChiefInspector");
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');
    var objBaseForm = MCgetAttribute("pagelets/xpagelet/@BaseFormName", null);
    if (sStateId == 'DeclarationCreatedState' || sStateId == 'DeclarationSubmitted' || sStateId == 'DutyCalculatedState' || sStateId == 'DeclarationRejected' || sStateId == 'DeclarationCancelledState') {
        if ((objBaseForm == 'ListPRDetailsOfClosedLs' || objBaseForm == 'PassengerDetailsView' || objBaseForm == 'PassengeManifestReceiptList')) {
            invoicecount = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/@TotalRecordsFetched', '');
            if (invoicecount >= 1) {
                var ADDITEMColName = 'EditInvoice';
                var frmName = 'DeclarationInvoice';
                for (var i = 0; i <= invoicecount; i++) {
                    var currADDITEMRowElement = HtmlElementById('List_' + frmName + '_' + i + '_' + ADDITEMColName);
                    if (currADDITEMRowElement != null) {
                        currADDITEMRowElement.disabled = true;
                    }
                }
            }
        }


        if (isInspector || isInspectorSupervisor || isChiefInspector) {
            if (HtmlElementById('DeclarationVehicles') != null) HtmlElementById('DeclarationVehicles').style.display = 'none';

        }
    }
    //var stateid = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId','');
    if (sStateId == 'DeclarationSeizedState') {
        invoicecount = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/@TotalRecordsFetched', '');
        if (invoicecount >= 1) {
            var ADDITEMColName = 'NewItem';
            var frmName = 'DeclarationInvoice';
            for (var i = 0; i <= invoicecount; i++) {
                var currADDITEMRowElement = HtmlElementById('List_' + frmName + '_' + i + '_' + ADDITEMColName);
                if (currADDITEMRowElement != null) {
                    currADDITEMRowElement.disabled = true;
                }
            }
        }
    }


    var LANDED_BY_MISTAKE_FOR_AIRPORT_WITH_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_AIRPORT_WITH_DO;
    var LANDED_BY_MISTAKE_FOR_SEAPORT_WITH_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_SEAPORT_WITH_DO;
    var LANDED_BY_MISTAKE_FOR_LANDPORT_WITH_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_LANDPORT_WITH_DO;

    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    //if(sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT
    if (sCCPId == LANDED_BY_MISTAKE_FOR_AIRPORT_WITH_DO || sCCPId == LANDED_BY_MISTAKE_FOR_SEAPORT_WITH_DO || sCCPId == LANDED_BY_MISTAKE_FOR_LANDPORT_WITH_DO) {
        if (HtmlElementById('DeclarationVehicles') != null)
            HtmlElementById('DeclarationVehicles').style.display = '';
    }
}

/*
function getDataForPrint(OtherRoles)
{
    var consigneetype = MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeType',null);
    if(consigneetype == 'o')
    {
        var consigneename = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@Name',null);
    }
    if(consigneetype == 'p')
    {
        var consigneename = MCgetAttribute('data/Declarationsrecords/PeopleForDeclarationrecords/PeopleForDeclaration/@Name',null);	
    }
    var agentid = MCgetAttribute('data/Declarationsrecords/Declarations/@AgentId',null);
    var createdby = MCgetAttribute('data/Declarationsrecords/Declarations/@CreatedBy',null);
    var OwnerLocId = MCgetAttribute('data/Declarationsrecords/Declarations/@OwnerLocId',null);
    var OwnerOrgId = MCgetAttribute('data/Declarationsrecords/Declarations/@OwnerOrgId',null);
    var AuditorId = MCgetAttribute('data/Declarationsrecords/Declarations/@AuditorId',null);
    var Decno = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationNumber',null); 
    var Decdate = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationDate',null); 
    var sBillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType',null);
    var sGWt = MCgetAttribute('data/Declarationsrecords/Declarations/@GWt',null); 
    var sHouseBillId = MCgetAttribute('data/Declarationsrecords/Declarations/@HouseBillId',null); 
    var sDeliveryOrderId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeliveryOrderId',null); 
    var Decdate = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationDate',null); 
    var sArchive = MCgetAttribute('data/Declarationsrecords/Declarations/@Archive',null); 
	
    if(sArchive == '1')
    {		
        printOnCondition('CustomsDeclaration Report_ARC','PrePrint','',consigneename,agentid,createdby,OwnerLocId,OwnerOrgId,AuditorId,Decno,OtherRoles,sBillType,sGWt,sHouseBillId,sDeliveryOrderId,Decdate);
    }
    else
    {
        printOnCondition('CustomsDeclaration Report','PrePrint','',consigneename,agentid,createdby,OwnerLocId,OwnerOrgId,AuditorId,Decno,OtherRoles,sBillType,sGWt,sHouseBillId,sDeliveryOrderId,Decdate);
    }
}
*/

function getDataForPrint(OtherRoles, PrintType) {
    var consigneetype = MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeType', null);
    if (consigneetype == 'o') {
        var consigneename = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@Name', null);
    }
    if (consigneetype == 'p') {
        var consigneename = MCgetAttribute('data/Declarationsrecords/PeopleForDeclarationrecords/PeopleForDeclaration/@Name', null);
    }
    var agentid = MCgetAttribute('data/Declarationsrecords/Declarations/@AgentId', null);
    var createdby = MCgetAttribute('data/Declarationsrecords/Declarations/@CreatedBy', null);
    var OwnerLocId = MCgetAttribute('data/Declarationsrecords/Declarations/@OwnerLocId', null);
    var OwnerOrgId = MCgetAttribute('data/Declarationsrecords/Declarations/@OwnerOrgId', null);
    var AuditorId = MCgetAttribute('data/Declarationsrecords/Declarations/@AuditorId', null);
    var Decno = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationNumber', null);
    var sBillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', null);
    var sGWt = MCgetAttribute('data/Declarationsrecords/Declarations/@GWt', null);
    var sHouseBillId = MCgetAttribute('data/Declarationsrecords/Declarations/@HouseBillId', null);
    var sDeliveryOrderId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeliveryOrderId', null);
    var Decdate = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationDate', null);
    var sArchive = MCgetAttribute('data/Declarationsrecords/Declarations/@Archive', null);

    var sPrintType = (typeof (PrintType) == 'undefined' ? 'PrePrint' : PrintType)

    //Added by Jones - As Per Production Issue - KRTS-5454 - 10-July-2012 - Begin
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    if (AuditorId == null || AuditorId == "") {
        alert('PRINT DENIED');
        return false;
    }
    else if (sStateId == 'DeclarationSubmitted' || sStateId == 'DeclarationInspectionRejected' || sStateId == 'SubToAuditor' || sStateId == 'DeclarationCreatedState' ||
        sStateId == 'DeclarationRejected' || sStateId == 'DeclarationAnalyzed' || sStateId == 'DutyCalculatedState' || sStateId == 'DeclarationModifiedState') {
        alert('PRINT DENIED');
        return false;
    }
    //Added by Jones - As Per Production Issue - KRTS-5454 - 10-July-2012 - Ends

    printOnCondition('CustomsDeclaration Report', sPrintType, '', consigneename, agentid, createdby, OwnerLocId, OwnerOrgId, AuditorId, Decno, OtherRoles, sBillType, sGWt, sHouseBillId, sDeliveryOrderId, Decdate);
}


function EnableDisableInvFields() {
    if (HtmlElementById('RefDeclarationNumber') != null) {
        if (HtmlElementById('RefDeclarationNumber').value != '') {
            if (HtmlElementById('addinvoice') != null) HtmlElementById('addinvoice').style.display = '';
            if (HtmlElementById('associateinvoice') != null) HtmlElementById('associateinvoice').style.display = '';
            if (HtmlElementById('assrefinv') != null) HtmlElementById('assrefinv').style.display = 'none';
        }

    }
}

function CheckRefExists(frm, decNo) {
    setParameterList(global_arrRegParameters, Array('', 'CheckDecNoExistance', decNo, '', '', getParameter('pageid', ''), '0'));
    pageSubmit(frm, false);
}

function CheckRefDec() {
    /*
    if(HtmlElementById('RefDecRow')!= null)
    {		
        var ccpid = MCgetAttribute('data/Declarationsrecords/CustomsControlProceduresrecords/CustomsControlProcedures/@CustomsControlProcedureId','');
    	
        if(ccpid == global_CustomsControlProcedures.RE_EXPORT_BILL_FOR_AIRPORT || ccpid == global_CustomsControlProcedures.RE_EXPORT_FOR_IMPORT_BILL_FOR_SEAPORT || ccpid == global_CustomsControlProcedures.RE_EXPORT_FOR_IMPORT_BILL_FOR_LANDPORT)
        {
            HtmlElementById('RefDecRow').style.display = '';							
            var sInvId = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices/@CommercialInvoiceId','');
                    	
            var sRefId = MCgetAttribute('data/Declarationsrecords/Declarations/DeclarationReferencesrecords/DeclarationReferences/@ReferenceDeclarationId','');
            var pageid = getParameter('pageid','');
            if(sRefId != '' || sInvId != '' || pageid == 'ExportBillCommercialInvoice')
            {			
                HtmlElementById('RefDeclarationNumber').disabled = true;
                HtmlElementById('RefDeclarationDate').disabled = true;
                HtmlElementById('RefDeclarationDateDatePicker').disabled = true;				
            }
            else
            {
                HtmlElementById('RefDeclarationNumber').disabled = false;
                HtmlElementById('RefDeclarationDate').disabled = false;
                HtmlElementById('RefDeclarationDateDatePicker').disabled = false;				
            }
        }
        else
        {
            HtmlElementById('RefDecRow').style.display = 'none';		
        }
        EnableDisableInvFields();		
    }
    */
}

/*
function hideDeclAlertMsgRow()
{
    var sAlertMsg = MCgetAttribute('data/Declarationsrecords/Declarations/@AlertMsg',null);
    if(sAlertMsg ==null || sAlertMsg =='')
    {
        if(HtmlElementById('DeclAlertMsgRow') != null)
        HtmlElementById('DeclAlertMsgRow').style.display = 'none';
    }
}
*/
function hideDeclAlertMsgRow() {

    var isAuditor = IsRoleExist("Customs Operation");
    var sBlinkMsg = msgDictionary('alertMsgMaqasa');
    var sMaqasa = MCgetAttribute('data/Declarationsrecords/Declarations/@Maqasa', '');
    if (!(sMaqasa == '1' && isAuditor)) {
        HtmlElementById("DeclAlertMsgRow").style.display = 'none';
    }
    var sMaqasaDueNoAvailable = MCgetAttribute('data/Declarationsrecords/Declarations/@MADuenoavilablity', '');
    if (sMaqasaDueNoAvailable == 'Notavailable')
        HtmlElementById("MADueNoAlert").style.display = '';
    else
        HtmlElementById("MADueNoAlert").style.display = 'none';

}

function DisableBack() {
    history.go(+1);
}
function setDeclaration_Page_title() {

    var sDeclarationDate = MCgetAttribute('data/Declarationsrecords/Declarations/@DecDateCreated', '');
    var sPaymentFlag = false;

    if (sDeclarationDate != null && isKNETOnlinePaymentEnabled(sDeclarationDate)) {
        sPaymentFlag = true;
    }

    if (sPaymentFlag == false) {
        if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
    }
    else {
        var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');
        var sRejCount = MCgetAttribute('data/Declarationsrecords/Declarations/@RejectCount', '0');

        if (IsRolesAvailable("ClearingAgent,ReadOnly,DR Broker,DirectReleaseAuditor,PWCSupport,Customs Operation,AuditorSupervisor,BWHClearingAgent")) {
            if (sStateId == 'DeclarationCreatedState' || sStateId == 'DeclarationCancelledState' || sStateId == 'CancelledByReqState' || (sStateId == 'DutyCalculatedState' && sRejCount <= 0)) {
                if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
            }
            else {
                if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = '';
            }
        }
        else {
            if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
        }
    }


    var sroleExists = IsRolesExist("Customs Operation,Inspector");
    var sDeclStateId = MCgetAttribute("data/Declarationsrecords/Declarations/DeclarationOGDApprecords/DeclarationOGDApp/@StateId", null)
    if (sroleExists && sDeclStateId == 'DeclarationOGDAppNotApplicable') {
        $(".OGAClass").show();
    }
    else {
        $(".OGAClass").hide();
    }
    if (sroleExists && sDeclStateId == 'DeclarationOGDAppRejectedState') {
        $(".OGDClass").show();
    }
    else {
        $(".OGDClass").hide();
    }

    //This function is to handle the view/edit declaration title, in case of using Arabic Language.
    //sArabicLangCode is used from pagelet.xsl
    if (interfaceLang.toUpperCase() == sArabicLangCode.toUpperCase()) {
        if (typeof (Declaration_Page_title) != 'undefined' && typeof (xmlServiceDocument) != 'undefined') {
            //UpdateTextNode(Declaration_Page_title,MCgetAttribute("data/Declarationsrecords/BillTypesrecords/BillTypes/@Description","") + " " + MCgetAttribute("data/Declarationsrecords/BillReasonrecords/BillReason/@Description",""),true);
            UpdateTextNode(Declaration_Page_title, MCgetAttribute("data/Declarationsrecords/CustomsControlProceduresrecords/CustomsControlProcedures/@Description", ""), true);
        }
        else {
            window.setTimeout("setDeclaration_Page_title()", 20);
        }

    }
    HideInspectionRequired()
}
function showReason(frmName) {
    var frm = document.forms[frmName];
    //var reason = MCgetAttribute("data/Declarationsrecords/CustomsControlProceduresrecords/CustomsControlProcedures/@Description",""),true)
}
function AssignPortOfLoading(frmName) {
    var portOfLoading = MCgetAttribute('data/Declarationsrecords/DeclarationDetailsrecords/DeclarationDetails/@PortsOfLoadingId', 'text');
    var frmObject = document.forms[frmName];
    if (portOfLoading == null || portOfLoading == '') {
        frmObject.PortsOfLoadingId.value = MCgetAttribute('user/@LogInPortId', '');
        frmObject.LoadingPort.value = MCgetAttribute('user/@LogInPortName', '');
    }
}

function CheckState(frmname, Action) {
    var frm = document.forms[frmname];

    if (MCgetAttribute("data/Declarationsrecords/Declarations/@StateId", null) == 'DutyCalculatedState') {
        //setParameterList(global_arrRegParameters, Array('','SubmitDeclaration','','ViewDeclarationGeneral',getParameter('actioncriteria',null),'ViewSAD','1'));
        //setParameterList(global_arrRegParameters, Array('','SubmitDeclaration','','Confirmations','','DeclarationConfirmation','1'));
        // Added by Nandu on 6/Feb/2005					
        //setParameter('pageid','DeclarationConfirmation');	
        setParameterList(global_arrRegParameters, Array('', 'SubmitDeclaration', '', 'Confirmations', '', 'DeclarationConfirmation', '1', '1', getParameter('actionid', null), getParameter('actioncriteria', null), getParameter('pageid', null)));



    }
    else {

        setParameterList(global_arrRegParameters, Array('', 'SubmitDeclaration', '', 'Confirmations', '', 'DeclarationConfirmation', '1'));
    }
}


function HideInspectionRequired() {

    var nPage;

    var InspectionReq = HtmlElementById("InsReq");

    var count;

    if (HtmlElementById('hdPrintCount') != null) {
        count = HtmlElementById('hdPrintCount').value;
    }

    if (count == '' || count == "0") {

        if (HtmlElementById('PrintPrePrintedBayan') != null)
            HtmlElementById('PrintPrePrintedBayan').style.display = 'block';
    }
    else {

        if (HtmlElementById('PrintPrePrintedBayan') != null) {
            if (bHidePrintOption == 'true')
                HtmlElementById('PrintPrePrintedBayan').style.display = 'none';
            else
                HtmlElementById('PrintPrePrintedBayan').style.display = 'block';

        }

    }

    if (InspectionReq != null) {

        if (MCgetAttribute("data/Declarationsrecords/Declarations/@CustomsControlProcedureId", "") == global_CCPPageId.DirectReleaseImportBill) {

            InspectionReq.style.display = '';
        }
        else {

            InspectionReq.style.display = 'none';
        }
    }


}

function selectInvoicePage(frm) {
    var nPage;
    if (frm.CustomsControlProcedureId.value == global_CCPPageId.DirectReleaseImportBill)
        //nPage="DirectReleaseCommercialInvoice";
        nPage = "CommercialInvoice";
    else
        nPage = "CommercialInvoice";

    if (ExecuteListAction("setParameterList(global_arrRegParameters, Array('','NewCommercialInvoiceOne','','','','" + nPage + "',''))", "noexecution") != false) {
        pageSubmit(frm, true);
    }
    return;
}

function disableAttach() {
    var AttachBtn = HtmlElementById('AttachPrint');
    var AttachReq = MCgetAttribute("data/Declarationsrecords/Declarations/@AttachmentRequired", null);
    if (AttachBtn != null) AttachBtn.disabled = ((AttachReq == 'true') ? false : true);
}
function editInvoicePage() {
    var nPage;
    if (document.all["CustomsControlProcedureId"].value == global_CCPPageId.DirectReleaseImportBill)
        //nPage="DirectReleaseCommercialInvoice";
        nPage = "CommercialInvoice";
    else if (document.all["CustomsControlProcedureId"].value == global_CCPPageId.GeneralTransitBill)
        nPage = "TransitCommercialInvoice";
    else
        nPage = "CommercialInvoice";

    return ExecuteListAction("setParameterList(global_arrRegParameters, Array('','OpenCommercialInvoiceOne','','','','" + nPage + "',''))", "noexecution");

}

function newInvoiceItemPage() {
    var nPage;
    if (document.all["CustomsControlProcedureId"].value == global_CCPPageId.DirectReleaseImportBill)
        //nPage="DirectReleaseCommercialInvoiceItem";
        nPage = "CommercialInvoiceItem";
    else if (document.all["CustomsControlProcedureId"].value == global_CCPPageId.GeneralTransitBill)
        nPage = "TransitCommercialInvoiceItem";
    else
        nPage = "CommercialInvoiceItem";

    return ExecuteListAction("setParameterList(global_arrRegParameters, Array('','NewCommercialInvoiceItemOne','','','','" + nPage + "',''))", "noexecution");
}
function editExportInvoicePage() {
    //ExecuteListAction('setParameterList(global_arrRegParameters, Array(\'\',\'OpenCommercialInvoiceThree\', \'\', \'\', \'\', \'ExportBillCommercialInvoice\',\'0\'))','noexecution',this);	
    return ExecuteListAction("setParameterList(global_arrRegParameters, Array('','OpenCommercialInvoiceThree','','','','ExportBillCommercialInvoice','0'))", "noexecution");

}
function ViewCommercialInvoice(thisRowID) {
    return ExecuteListAction("LockupScreen('','ViewCommercialInvoicePopUp','ViewCommercialInvoice','" + ProfileField('CommercialInvoices.CommercialInvoiceId', 'text') + " " + "=\\'" + tdValue(thisRowID, 'CommercialInvoiceId') + "\\'',1000,600,true,false)", "noexecution");
}
function newExportInvoiceItemPage() {
    //ExecuteListAction('setParameterList(global_arrRegParameters, Array(\'\',\'NewCommercialInvoiceItemOne\', \'\', \'\', \'\', \'ExportBillCommercialInvoiceItem\',\'0\'))','noexecution',this);
    return ExecuteListAction("setParameterList(global_arrRegParameters, Array('','NewCommercialInvoiceItemOne','','','','ExportBillCommercialInvoiceItem','0'))", "noexecution");
}
function disableCheckBox(frmName, actionid) {
    var ctl = document.forms[frmName].elements['PeopleVerified'];
    var consigneeType = MCgetAttribute("data/Declarationsrecords/Declarations/@ConsigneeType", null);
    if (ctl != null) {
        if ((consigneeType == 'p') && isActionAvailable(actionid)) ctl.disabled = false;
        else { ctl.checked = true; ctl.disabled = true; }
    }
}

function disableConsignee(frmName) {

    var frm = document.forms[frmName];
    if (frm != null) {

        //frm.consigneebrowsebutton.disabled=true;
    }

    if (frm != null && frmName == 'DirectReleaseSAD') {
        var invoiceId = MCgetAttribute("data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices/@CommercialInvoiceId", null);
        if (invoiceId != null && invoiceId != '') {
            if (frm.createinvoiceitem != null) {
                frm.createinvoiceitem.disabled = true;
            }
        }
    }
    if (frm != null && frmName == 'TransitBillSAD') {
        var invoiceId = MCgetAttribute("data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices/@CommercialInvoiceId", null);
        if (invoiceId != null && invoiceId != '') {
            if (frm.createinvoiceitem != null) {
                frm.createinvoiceitem.disabled = true;
            }
        }
    }
}

function disableCtrlsForRef() {
    var refDeclId = MCgetAttribute("data/Declarationsrecords/Declarations/@RefDeclarationId", null);
    var LANDED_BY_MISTAKE_FOR_AIRPORT_WITHOUT_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_AIRPORT_WITHOUT_DO;
    var LANDED_BY_MISTAKE_FOR_SEAPORT_WITHOUT_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_SEAPORT_WITHOUT_DO;
    var LANDED_BY_MISTAKE_FOR_LANDPORT_WITHOUT_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_LANDPORT_WITHOUT_DO;

    var QUO_EXPORT_BILL_FOR_AIRPORT = global_CustomsControlProcedures.EXPORT_BILL_FOR_AIRPORT;
    var QUO_EXPORT_BILL_FOR_SEAPORT = global_CustomsControlProcedures.EXPORT_BILL_FOR_SEAPORT;
    var QUO_EXPORT_BILL_FOR_LANDPORT = global_CustomsControlProcedures.EXPORT_BILL_FOR_LANDPORT;

    var QUO_STATISTICAL_BILL_FOR_LAND = global_CustomsControlProcedures.STATISTICAL_BILL_FOR_LAND;
    var QUO_STATISTICAL_BILL_FOR_AIR = global_CustomsControlProcedures.STATISTICAL_BILL_FOR_AIR;
    var QUO_STATISTICAL_BILL_FOR_SEA = global_CustomsControlProcedures.STATISTICAL_BILL_FOR_SEA;

    var QUO_EXPORT_BILL_FOR_FREEZONE = global_CustomsControlProcedures.EXPORT_BILL_FOR_FREEZONE;

    var CCPID = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', 'text');

    if (refDeclId != '' && refDeclId != null) {
        //if(HtmlElementById ("weight")!=null)
        //	HtmlElementById ("weight").disabled=true;
        HtmlElementById("unitprice").disabled = true;
        //HtmlElementById ("totalprice").disabled=true;
        var sStateId = MCgetAttribute("data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@StateId", null);
        if (sStateId != null && sStateId != '') {
            var sRefCItemId = '';
            var strXml = xmlServiceDocument.selectSingleNode(rootNodeName + "/" + dataNodeName + "/CommercialInvoiceItemsrecords");
            strXml = OuterXML(strXml)
            var myReq = new SilentActionCall('CheckReferenceCommercialInvoiceItemsStatus', '', fireOnConditionIfExists, strXml, 'servicedocument', 'actionservice/exception');
            myReq.StartRequest();
            myReq = null;
            function fireOnConditionIfExists(xmlRes) {
                if (xmlRes[0].getAttribute('code') != '')
                    sRefCItemId = '1';
                else
                    sRefCItemId = '0';
            }

            if ((sStateId == 'TariffItemsCreatedState' || sStateId == 'TariffItemsModifiedState') && sRefCItemId == '0') {
                HtmlElementById("hscode").disabled = true;
                if (HtmlElementById("hscodebrowsebutton") != null) {
                    HtmlElementById("hscodebrowsebutton").disabled = true;
                }
                if (HtmlElementById("browsebutton") != null) {
                    HtmlElementById("browsebutton").disabled = true;
                }
            }
            else {
                HtmlElementById("hscode").disabled = false;
                if (HtmlElementById("hscodebrowsebutton") != null) {
                    HtmlElementById("hscodebrowsebutton").disabled = false;
                }
                if (HtmlElementById("browsebutton") != null) {
                    HtmlElementById("browsebutton").disabled = false;
                }
                if (HtmlElementById('TempExpCode') != null) HtmlElementById('TempExpCode').disabled = true;
                if (HtmlElementById('description') != null) HtmlElementById('description').disabled = true;
                if (HtmlElementById('country') != null) HtmlElementById('country').disabled = true;
                if (HtmlElementById('countrybrowsebutton') != null) HtmlElementById('countrybrowsebutton').disabled = true;
                if (HtmlElementById('HSCodeDescription') != null) HtmlElementById('HSCodeDescription').disabled = true;
                if (HtmlElementById('totalprice') != null) HtmlElementById('totalprice').disabled = false;
                if (HtmlElementById('unitprice') != null) HtmlElementById('unitprice').disabled = true;
                if (HtmlElementById('txtpackagetype') != null) HtmlElementById('txtpackagetype').disabled = true;
                if (HtmlElementById('btnPackageType') != null) HtmlElementById('btnPackageType').disabled = true;
                if (HtmlElementById('IsRestricted') != null) HtmlElementById('IsRestricted').disabled = true;
                if (HtmlElementById('volume') != null) HtmlElementById('volume').disabled = true;
                if (HtmlElementById('txtRestrictionName') != null) HtmlElementById('txtRestrictionName').disabled = true;
                if (HtmlElementById('btnRestrictionType') != null) HtmlElementById('btnRestrictionType').disabled = true;
                if (HtmlElementById('txtRestrictionId') != null) HtmlElementById('txtRestrictionId').disabled = true;
                if (HtmlElementById('noofpackages') != null) HtmlElementById('noofpackages').disabled = false;
                if (HtmlElementById('weight') != null) HtmlElementById('weight').disabled = false;
                if (HtmlElementById('Gross1') != null) HtmlElementById('Gross1').disabled = false;
                if (HtmlElementById('quantity') != null) HtmlElementById('quantity').disabled = false;
                if (HtmlElementById('Manufacturer') != null) HtmlElementById('Manufacturer').disabled = true;
                if (HtmlElementById('oldunitprice') != null) HtmlElementById('oldunitprice').disabled = true;
                if (HtmlElementById('cmdConvert') != null) HtmlElementById('cmdConvert').disabled = true;
                if (HtmlElementById('IsExempted') != null) HtmlElementById('IsExempted').disabled = true;
                if (HtmlElementById('volume') != null) HtmlElementById('volume').disabled = true;
                if (HtmlElementById('OtherReleases') != null) HtmlElementById('OtherReleases').disabled = true;
                if (HtmlElementById('ExemptionDetails') != null) HtmlElementById('ExemptionDetails').disabled = true;
                if (HtmlElementById('IsRestricted').checked == true)
                    if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                    else
                        if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
            }
        }
    }
    //Added by Jones - To Show Hide HCSode Tree ViewLink - 22-June-2011 - Begin
    var StateId = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@StateId', null);
    if (StateId != 'CommercialInvoiceItemStartState') {
        if (HtmlElementById('lnkTreeView') != null) HtmlElementById('lnkTreeView').style.display = '';
        if (HtmlElementById('lnkQuota') != null) HtmlElementById('lnkQuota').style.display = '';
    }
    else {
        if (HtmlElementById('lnkTreeView') != null) HtmlElementById('lnkTreeView').style.display = 'none';
        if (HtmlElementById('lnkQuota') != null) HtmlElementById('lnkQuota').style.display = 'none';
    }

    if (CCPID == LANDED_BY_MISTAKE_FOR_AIRPORT_WITHOUT_DO || CCPID == LANDED_BY_MISTAKE_FOR_SEAPORT_WITHOUT_DO || CCPID == LANDED_BY_MISTAKE_FOR_LANDPORT_WITHOUT_DO) {
        if (HtmlElementById('lnkQuota') != null) HtmlElementById('lnkQuota').style.display = 'none';
    }


    if (CCPID == QUO_EXPORT_BILL_FOR_AIRPORT || CCPID == QUO_EXPORT_BILL_FOR_SEAPORT || CCPID == QUO_EXPORT_BILL_FOR_LANDPORT || CCPID == QUO_STATISTICAL_BILL_FOR_LAND || CCPID == QUO_STATISTICAL_BILL_FOR_AIR || CCPID == QUO_STATISTICAL_BILL_FOR_SEA || CCPID == QUO_EXPORT_BILL_FOR_FREEZONE) {
        if (StateId != 'CommercialInvoiceItemStartState') {
            if (HtmlElementById('lnkQuota') != null) HtmlElementById('lnkQuota').style.display = '';
        }
    }
    else {

        if (HtmlElementById('lnkQuota') != null) HtmlElementById('lnkQuota').style.display = 'none';

    }

    //Added by Jones - Ends
}

function disableListLink(frmName, colName) {
    //frmName is the id of the List
    //ColName is the name attribute value of the cell containing the Hyperlink
    HideActionsForBoundedInboundBayan();

    var refDeclId = MCgetAttribute("data/Declarationsrecords/Declarations/@RefDeclarationId", null);
    var refDeclNumber = MCgetAttribute("data/Declarationsrecords/Declarations/@RefDeclarationNumber", null);
    //////////////chek th list then disabled item depond on the frm name
    for (var i = 0; ; i++) {
        var currRowElement = HtmlElementById('List_' + frmName + '_' + i + '_' + colName);
        if (currRowElement != null) {
            if (refDeclNumber != null && refDeclNumber.Trim().length > 0)
                currRowElement.disabled = false;
            else
                currRowElement.disabled = (refDeclId != '' ? true : false);
        }
        else break;
    }


    if (checkBill() == 'true' || checkOrgingType() == 'true' || checkState() == 'true') {
        for (var i = 0; ; i++) {
            var currRowElement = HtmlElementById('List_' + frmName + '_' + i + '_' + colName);
            if (currRowElement != null) {
                if (refDeclNumber != null && refDeclNumber.Trim().length > 0)
                    currRowElement.disabled = false;
                else
                    currRowElement.disabled = true;
            }
            else break;

            if (checkState() == 'true') {
                currRowElement = HtmlElementById('List_' + frmName + '_' + i + '_EditInvoice');
                if (currRowElement != null) {
                    if (refDeclNumber != null && refDeclNumber.Trim().length > 0)
                        currRowElement.disabled = false;
                    else
                        currRowElement.disabled = true;
                }
            }
        }
    }

    if (HtmlElementById('rowCancellation') != null) {
        var sStateId = MCgetAttribute("data/Declarationsrecords/Declarations/@StateId", null);
        if (sStateId == 'DeclarationCancelledState') {
            HtmlElementById('rowCancellation').style.display = '';
        }
        else {
            HtmlElementById('rowCancellation').style.display = 'none';
        }
    }

    var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    var CCPTypeId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');

    /*
    if( BillType == global_BillType.Export )
    //|| CCPTypeId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT ||
    //	CCPTypeId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT ||
    //	CCPTypeId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT  )
    {
    if ( HtmlElementById('DeclarationVehicles') != null )
    {
    HtmlElementById('DeclarationVehicles').disabled = true;
    HtmlElementById('DeclarationVehicles').onclick ='';
    }
    }
    */
    if (CCPTypeId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT ||
        CCPTypeId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT ||
        CCPTypeId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT) {
        if (HtmlElementById('viewCCPReqDocs') != null) {
            HtmlElementById('viewCCPReqDocs').disabled = true;
            HtmlElementById('viewCCPReqDocs').onclick = '';
        }
        if (HtmlElementById('ItemsForDocsMiss') != null) {
            HtmlElementById('ItemsForDocsMiss').disabled = true;
            HtmlElementById('ItemsForDocsMiss').onclick = '';
        }
    }




}

function checkState() {
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');
    if (sStateId == 'AwForApp' || sStateId == 'SubToAuditor' || sStateId == 'DeclarationReleased' || sStateId == 'DeclarationExitReleasedState' || sStateId == 'DeclarationPaidInRedState' || sStateId == 'DeclarationCancelledState') {
        return 'true';
    }
    else {
        return 'false';
    }
}
function disableCalculateDutyChkBox()  // Coded by Gopinath Mani for Hiding Calculate Customs Duty Checkbox for a specific CCP
{
    //N var GENERAL_STATISTICAL_BILL_FROM_KFTZ_TO_GCC = 'ED551C8265D045B491A167A199B6287B';
    var GENERAL_STATISTICAL_BILL_FROM_KFTZ_TO_GCC = global_CustomsControlProcedures.GENERAL_STATISTICAL_BILL_FROM_KFTZ_TO_GCC;


    var CCPID = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', 'text');
    if (CCPID == GENERAL_STATISTICAL_BILL_FROM_KFTZ_TO_GCC)
        HtmlElementById('CalcCustDutyRow').style.display = '';
    else
        HtmlElementById('CalcCustDutyRow').style.display = 'none';
}

function disableConsigneeLookUp(colName) {
    if (HtmlElementById(colName) != null) {
        HtmlElementById(colName).disabled = true;
    }
}
function disableDeclaratonDate(frmName) {
    var frmObject = document.forms[frmName];
    if (frmName == 'SAD') {
        frmObject.DeclarationDate.disabled = true;
        frmObject.DeclarationDateDatePicker.disabled = true;
    }
    else if (frmName == 'DeclarationExportBill') {
        frmObject.date.disabled = true;
        frmObject.dateDatePicker.disabled = true;
    }
}

function eusiteConfigurationForItem(frmName) {
    var frm = document.forms[frmName];
    if (EUSite == 'yes') {
        TarrifRow1.style.display = 'none';
        TarrifRow2.style.display = 'none';
        TaricRow1.style.display = '';
        TaricRow2.style.display = '';
        frm.quantity.setAttribute('NoSave', 'yes', true);
    }
    else {
        TaricRow1.style.display = 'none';
        TaricRow2.style.display = 'none';
        TarrifRow1.style.display = '';
        TarrifRow2.style.display = '';
        frm.quantity1.setAttribute('NoSave', 'yes', true);
    }

}

function HideReasonForRemarks() {
    var nPage;
    var rowreason = HtmlElementById("rowreason");
    var rowreason1 = HtmlElementById("rowreason1");
    var ReasonForRejectionForm = HtmlElementById("ReasonForRejectionForm");
    if (rowreason != null) {
        //var customsrole=MCgetAttribute("user/@Roles",null);
        var isCustoms = IsRoleExist("Customs");
        var isSysAdmin = IsRoleExist("SysAdmin");

        //if (customsrole.indexOf("Customs")>-1 || customsrole.indexOf("SysAdmin")>-1 )
        if (isCustoms || isSysAdmin) {
            rowreason.style.display = '';
            rowreason1.style.display = '';
        }
        else {
            rowreason.style.display = 'none';
            rowreason1.style.display = 'none';
        }
    }
}

function checkCarrierTypeId(objCtl, bOpenPopup) {
    if (objCtl.form.carriertype.value == '') {
        objCtl.form.vesselname.value = "";
        ShowFormException(objCtl.form.formexception.value, msgDictionary('carriertyperequired'), 'carriertype');
    }
    else {
        if (!bOpenPopup) {
            SearchTest(objCtl.form.name, 'ListCarriers', 'ListCarriers', ProfileField('Carriers.CarrierName', 'text') + ' LIKE N\'' + EncodeCriteriaFieldValue(objCtl.value) + '%\' and ' + ProfileField('Carriers.CarrierTypeId', 'text') + '=\'' + EncodeCriteriaFieldValue(objCtl.form.carriertype.value) + '\'', resetVesselname, updateVesselname, null, rootNodeName + '/' + dataNodeName + '/' + 'Carriersrecords', 'Carriers', 850, 370);

        }
        else LockupScreen(objCtl.form.name, 'ListCarriers', 'ListCarriers', ProfileField('Carriers.CarrierTypeId', 'text') + '=\'' + EncodeCriteriaFieldValue(objCtl.form.carriertype.value) + '\'' + 'And 1=2', 850, 370, true, false);
    }
}

function resetVesselname() {
    //reset values, related to VesselName.
    var objBaseForm = document.forms["DeclarationExportBill"];
    //objBaseForm.CarrierId.value = "";
    objBaseForm.vesselname.value = "";
    //objBaseForm.Voyage.value="";
}
function updateVesselname(xmlObjTemp) {
    //update the values, related to VesselName. 
    var objBaseForm = document.forms["DeclarationExportBill"];
    objBaseForm.CarrierId.value = xmlObjTemp.getAttributeNode("CarrierId").nodeValue;
    objBaseForm.vesselname.value = xmlObjTemp.getAttributeNode("CarrierName").nodeValue;
    //objBaseForm.Voyage.value = xmlObjTemp.getAttributeNode("CarrierNumber").nodeValue;

    ClearErrorMsg(objBaseForm.formexception.value);
}

function resetCountry() {
    //reset values, related to Country.
    var objBaseForm = document.forms["TransitBillSAD"];
    objBaseForm.TransitCountryID.value = "";
    objBaseForm.Transitcountry.value = "";
}

function updateCountry(xmlObjTemp) {
    //update the values, related to Country.     
    var objBaseForm = document.forms["TransitBillSAD"];
    objBaseForm.TransitCountryID.value = xmlObjTemp.getAttributeNode("LocationId").nodeValue;
    objBaseForm.Transitcountry.value = xmlObjTemp.getAttributeNode("Name").nodeValue;
    ClearErrorMsg(objBaseForm.formexception.value);
}

function resetInterCessorOrg() {
    //reset values, related to OriginPort.
    var objBaseForm = document.forms["SAD"];
    if (objBaseForm == null) {
        objBaseForm = document.forms["DeclarationExportBill"]
    }
    if (objBaseForm == null) {
        objBaseForm = document.forms["TransitBillSAD"]
    }
    objBaseForm.InterCessorName.value = "";
    objBaseForm.InterCessorId.value = "";
}
function updateInterCessorOrg(xmlObjTemp) {
    //update the values, related to OriginPort.
    var objBaseForm = document.forms["SAD"];

    if (objBaseForm == null) {
        objBaseForm = document.forms["DeclarationExportBill"]
    }
    if (objBaseForm == null) {
        objBaseForm = document.forms["TransitBillSAD"]
    }
    objBaseForm.InterCessorId.value = xmlObjTemp.getAttributeNode("OrganizationId").nodeValue;
    objBaseForm.InterCessorName.value = xmlObjTemp.getAttributeNode("Name").nodeValue;
    ClearErrorMsg(objBaseForm.formexception.value);
}

function printOnCondition(sReportId, Action, Page, ConsigneeName, AgentId, CreatedBy, OwnerLocId, OwnerOrgId, AuditorId, refno, OtherRoles, BillType, sGWt, sHouseBillId, sDeliveryOrderId, Decdate) {


    var refid = HtmlElementById('DeclarationId').value;
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations[@DeclarationId="' + refid + '"]/@StateId');
    var sCCPId = HtmlElementById('CustomsControlProcedureId').value;
    var strXml = '<Declarationsrecords><Declarations DeclarationId="' + refid + '" GWt="' + sGWt + '" HouseBillId="' + sHouseBillId + '" DeliveryOrderId="' + sDeliveryOrderId + '"  OtherRoles="' + OtherRoles + '" BillType="' + BillType + '" OwnerOrgId="' + OwnerOrgId + '" OwnerLocId="' + OwnerLocId + '" AuditorId="' + AuditorId + '" CreatedBy="' + CreatedBy + '" DeclarationNumber="' + refno + '"  DeclarationDate="' + Decdate + '"  ReportId="' + sReportId + '" StateId="' + sStateId + '" CustomsControlProcedureId="' + sCCPId + '" /> </Declarationsrecords>';
    //var strXml = '<Declarationsrecords><Declarations DeclarationId="' + refid + '" DeclarationNumber="' + refno + '" ReportId="' + sReportId + '" /> </Declarationsrecords>';
    var MyReq = new SilentActionCall('PrintDeclaration', '', fireOnCondition, strXml, 'servicedocument', 'actionservice/exception');
    MyReq.StartRequest();

    MyReq = null;

    function fireOnCondition(xmlRes) {

        if (xmlRes[0].getAttribute('code') == '') {

            _stopBlink(_alertMsgBlinkId, 'AlertMsg');
            _stopBlink(_conBlinkId, 'ConsigneeDiffMsg2');
            //_stopBlink(_priceAlertMsgBlinkid,'PriceAlertMessage');
            if (sReportId == 'ViewSAD') {
                //printHiddenView('ViewSAD',ProfileField('Declarations.DeclarationId','text') + '=\''+refid+'\'','','true','','',[0,0,0,0]);
                PgVar_Print = true;
                printHiddenXsl('homepage1', HtmlElementById('DeclarationId').value);
            }
            else {
                if (Action == 'PrePrint' || Action == 'PrePrintByRange') {
                    totalpages = xmlRes[0].getAttribute('BayanPageCount');//MCgetAttribute('data/Declarationsrecords/Declarations/@BayanPageCount',1);
                    total_times = xmlRes[0].getAttribute('NoBatches');//MCgetAttribute('data/Declarationsrecords/Declarations/@NoBatches',1);

                    TokenID = xmlRes[0].getAttribute('BayanPrintToken');
                    var sPageId = getParameter("pageid", "");
                    var sActionCriteria = getParameter("actioncriteria", "");
                    if (Action == 'PrePrint') {
                        // by Gopinath Mani 04-Nov
                        var ownerLocId = MCgetAttribute('user/@LogInPortId', '');

                        //if ( __PrintBayanByTokenPorts.indexOf(ownerLocId) > -1 && ! IsRoleExist("PrintBayanOldTech")  )
                        if (IsThisPCwithNewBayanPrinting()) {
                            CallBayanPrintingNewTech(TokenID, 0, 0, 0, 0); // sending token id, page start and number of pages.
                        }
                        else
                            CustomsDeclarationReport_NextRequest(0);
                    }
                    else if (Action == 'PrePrintByRange') getPageRange();

                    //setParameterList(global_arrRegParameters, Array('','ListDeclarationsForCustomsControlProcedures',getParameter('previousactioncriteria',null),'','','ListDeclaration','0'));
                    //setParameterList(global_arrRegParameters, Array('',getParameter('actionid',null),getParameter('actioncriteria',null),'','',getParameter('pageid',null),'0'));
                    setParameterList(global_arrRegParameters, Array('', 'ListDeclarationsForCustomsControlProcedures', getParameter('actioncriteria', null), '', '', 'ListDeclaration', '0'));

                }

                /*
                    else
                    {
                    if(Action == 'PrePrint' || Action == 'PrePrintByRange')
                    {
                    totalpages = xmlRes[0].getAttribute('BayanPageCount');//MCgetAttribute('data/Declarationsrecords/Declarations/@BayanPageCount',1);
                    total_times= xmlRes[0].getAttribute('NoBatches');//MCgetAttribute('data/Declarationsrecords/Declarations/@NoBatches',1);
                    var sPageId = getParameter("pageid","");
                    var sActionCriteria = getParameter("actioncriteria","");
                    if (Action == 'PrePrint') CustomsDeclarationReport_NextRequest(0);
                    if (Action == 'PrePrintByRange') getPageRange();
                    //printHiddenView_p2('CustomsDeclaration Report',ProfileField('Declarations.DeclarationId','text') + '=\''+refid +'\'','','true','','','0.17,0.75,0.17,0.17','Fanfold 210 x 305 mm',1,'') ;
                      //setParameterList(global_arrRegParameters, Array('','ListDeclarationsForCustomsControlProcedures',getParameter('previousactioncriteria',null),'','','ListDeclaration','0'));
                      //setParameterList(global_arrRegParameters, Array('',getParameter('actionid',null),getParameter('actioncriteria',null),'','',getParameter('pageid',null),'0'));
                      setParameterList(global_arrRegParameters, Array('','ListDeclarationsForCustomsControlProcedures',getParameter('actioncriteria',null),'','','ListDeclaration','0'));
                      }
                      */

                /* if(Action == 'PrePrint')
                {
          
                var sPageId = getParameter("pageid","");
                var sActionCriteria = getParameter("actioncriteria","");
                if(sReportId == 'CustomsDeclaration Report_ARC')
                {
                printHiddenView_p2('CustomsDeclaration Report_ARC',ProfileField('Declarations.DeclarationId','text') + '=\''+refid +'\'','','true','','','0.17,0.75,0.17,0.17','Fanfold 210 x 305 mm') ;
                }
                else
                {
                printHiddenView_p2('CustomsDeclaration Report',ProfileField('Declarations.DeclarationId','text') + '=\''+refid +'\'','','true','','','0.17,0.75,0.17,0.17','Fanfold 210 x 305 mm') ;
                }
          
                //setParameterList(global_arrRegParameters, Array('','ListDeclarationsForCustomsControlProcedures',getParameter('previousactioncriteria',null),'','','ListDeclaration','0'));
                //setParameterList(global_arrRegParameters, Array('',getParameter('actionid',null),getParameter('actioncriteria',null),'','',getParameter('pageid',null),'0'));
                setParameter('previouspageid',getParameter('pageid',''));
                setParameterList(global_arrRegParameters, Array('','ListDeclarationsForCustomsControlProcedures',getParameter('actioncriteria',null),'','','ListDeclaration','0'));
                } */
                else if (Action == 'RePrint') {
                    if (Page == 'ExportBillTaxesandDuties') {
                        LockupScreen(Page, 'RePrintReasonFrPg', 'RePrintDeclaration', ProfileField('RePrintReasonsTypes.TypeTypeId', 'text') + '=\'3B5BA7C477D14A389450D13C1484DCF9\'', 500, 150, false, false);
                    }
                    else if (Page == 'TaxesandDuties') {
                        LockupScreen(Page, 'RePrintReasonFrPg', 'RePrintManifestLand', ProfileField('RePrintReasonsTypes.TypeTypeId', 'text') + '=\'3B5BA7C477D14A389450D13C1484DCF9\'', 500, 150, false, false);
                    }
                    else {
                        LockupScreen(Page, 'RePrintReasonFrPg', 'RePrintManifestLand', ProfileField('RePrintReasonsTypes.TypeTypeId', 'text') + '=\'3B5BA7C477D14A389450D13C1484DCF9\'', 500, 150, false, false);
                    }
                }
            }
        }
        else {
            var sErrorCode = xmlRes[0].getAttribute('code');
            /*
            if(sErrorCode == 'DDC0109')
            {
            var sErrorMsg = msgDictionary('DDC0109');
            alert(sErrorMsg);
            }
            else if(sErrorCode == 'DDC0110')
            {
            var sErrorMsg = msgDictionary('DDC0110');
            alert(sErrorMsg);
            }
            else if(sErrorCode == 'RECDE01')
            {
            var sErrorMsg = msgDictionary('RECDE01');
            alert(sErrorMsg);
            }
            else if(sErrorCode == 'RECDE11')
            {
            var sErrorMsg = msgDictionary('RECDE11');
            alert(sErrorMsg);
            }
            else if(sErrorCode == 'RECDE02')
            {
            var sErrorMsg = msgDictionary('RECDE02');
            alert(sErrorMsg);
            }
            else if(sErrorCode == 'RECDE21')
            {
            var sErrorMsg = msgDictionary('RECDE21');
            alert(sErrorMsg);
            }
            else if(sErrorCode == 'RECDE07')
            {
            var sErrorMsg = msgDictionary('RECDE07');
            alert(sErrorMsg);
            }
            else if(sErrorCode == 'RECDE71')
            {
            var sErrorMsg = msgDictionary('RECDE71');
            alert(sErrorMsg);
            }
            */
            if (sErrorCode == 'RECDEER') {
                var sErrorMsg = msgDictionary('RECDEER');
                alert(sErrorMsg);
            }
            else if (sErrorCode == 'RECDE22') {
                var sErrorMsg = msgDictionary('RECDE22');
                alert(sErrorMsg);
            }
            else if (sErrorCode == 'RECDE23') {
                var sErrorMsg = msgDictionary('RECDE23');
                alert(sErrorMsg);
            }
            else if (sErrorCode == 'errInsNotPaid') {
                var sErrorMsg = msgDictionary('errInsNotPaid');
                alert(sErrorMsg);
            }

            else if (sErrorCode.indexOf('SFEENP') == 0) {
                var sErrorMsg = msgDictionary(sErrorCode);
                alert(sErrorMsg);
            }
            else if (sErrorCode == 'errServicesNotPaid') {
                var sParams = xmlRes[0].getAttribute('context_value');
                var sErrorMsg = msgDictionary(sErrorCode).replace('@0', sParams);
                alert(sErrorMsg);
            }


            else {
                alert('PRINT DENIED');
            }
        }
    }
}


function CallBayanPrintingNewTech(TokenId, FPage, TPage, TtlPages) // by Gopinath Mani for new technique
{
    var oShell = new ActiveXObject("Shell.Application");
    var arg = ' DeclarationReport '; //alert( TPage );
    // passing from and to page as zero as it is a full printing.

    arg += '"' + TokenId + '"' + ' ';
    arg += '"' + FPage + '"' + ' ';
    arg += '"' + TPage + '"' + ' ';
    arg += '"' + TtlPages + '"' + ' ';
    //alert('Calling the new bayan printing technique....'+ arg);
    oShell.ShellExecute(__BynPrnSmartClientAppPath, arg, "", "open", "1");
    setParameterList(global_arrRegParameters, Array('', 'ListDeclarationsForCustomsControlProcedures', getParameter('actioncriteria', null), '', '', 'ListDeclaration', '0'));
    pageSubmit(null, false);

}



function checkTransitBill() {
    var CCPID = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');

    var flag = 'false';

    if (CCPID == global_CustomsControlProcedures.TRANSIT_BILL_FOR_AIRPORT) {
        flag = 'true';
    }
    else if (CCPID == global_CustomsControlProcedures.TRANSIT_BILL_FOR_SEAPORT) {
        flag = 'true';
    }
    else if (CCPID == global_CustomsControlProcedures.TRANSIT_BILL_FOR_LANDPORT) {
        flag = 'true';
    }
    return flag;


}

function checkBill() {

    var CCPID = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    var flag = 'false';
    var IsMaqasa = HtmlElementById("IsMaqasa");

    if (CCPID == global_CustomsControlProcedures.RE_EXPORT_BILL_FOR_AIRPORT) {

        flag = 'true';
    }
    else if (CCPID == global_CustomsControlProcedures.RE_EXPORT_FOR_IMPORT_BILL_FOR_SEAPORT) {
        flag = 'true';
    }
    else if (CCPID == global_CustomsControlProcedures.RE_EXPORT_FOR_KFTZ) {
        flag = 'true';
    }
    else if (CCPID == global_CustomsControlProcedures.RE_EXPORT_FOR_IMPORT_BILL_FOR_LANDPORT) {
        flag = 'true';
    }
    else if (CCPID == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT) {
        flag = 'true';
    }
    else if (CCPID == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT) {
        flag = 'true';
    }
    else if (CCPID == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT) {
        flag = 'true';
    }
    if (HtmlElementById('IsMaqasa') != null) {
        if (IsMaqasa.checked && (CCPID == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_LAND || CCPID == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_SEA || CCPID == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_AIR)) {
            flag = 'true';
        }
    }

    return flag;
}

function DisableAddInv(bill) {

    var dodisable = 'false';
    dodisable = decideDisabling(bill);

    if (dodisable == 'true') {
        if (HtmlElementById('addinvoice') != null) {
            HtmlElementById('addinvoice').style.display = 'none';
        }

        if (HtmlElementById('nlblRefDec') != null) {
            HtmlElementById('nlblRefDec').style.display = '';
        }
        if (HtmlElementById('associateinvoice') != null) {
            HtmlElementById('associateinvoice').style.display = 'none';
        }
        if (HtmlElementById('disassociate') != null) {
            HtmlElementById('disassociate').style.display = 'none';
        }
        if (HtmlElementById('assrefinv') != null) {
            if (bill == 'tmpimport')
                HtmlElementById('assrefinv').style.display = 'none';
            else

                HtmlElementById('assrefinv').style.display = '';
            if (HtmlElementById('disassociate') != null) {
                HtmlElementById('disassociate').style.display = '';
            }
        }
    }
    else {
        if (HtmlElementById('assrefinv') != null) {
            HtmlElementById('assrefinv').style.display = 'none';
        }
        if (HtmlElementById('nlblRefDec') != null) {
            HtmlElementById('nlblRefDec').style.display = 'none';
        }
    }

    var sTotalRecords = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices/CommercialInvoiceItemsrecords/@TotalRecordsFetched', null);
    if (sTotalRecords > 0) {
        if (HtmlElementById('GoodsDetectionItemsList') != null) HtmlElementById('GoodsDetectionItemsList').style.display = '';
    }
    else {
        if (HtmlElementById('GoodsDetectionItemsList') != null) HtmlElementById('GoodsDetectionItemsList').style.display = 'none';
    }

}

function disableInvFields(bill) {

    var dodisable = 'false';
    if (bill == 'reexport') {

        if (checkBill() == 'false') {

            //return checkOrgingType();
            var sRefInvId = MCgetAttribute("data/CommercialInvoicesrecords/CommercialInvoices/@RefInvId", null);
            if (sRefInvId == null || sRefInvId == '') {
                dodisable = 'false';
            }
            else {
                dodisable = 'true';
            }
        }
        else {

            dodisable = 'true';
        }
    }
    else {
        dodisable = decideDisabling(bill);
    }


    if (dodisable == 'true') {

        if (HtmlElementById('RefDeclarationNumber') != null) {

            if (HtmlElementById('RefDeclarationNumber').value == '') {


                if (HtmlElementById('associateinvoiceitem') != null) {
                    HtmlElementById('associateinvoiceitem').disabled = false;
                }
                if (HtmlElementById('orderno') != null) {
                    HtmlElementById('orderno').disabled = true;
                }
                if (HtmlElementById('invoicetype') != null) {
                    HtmlElementById('invoicetype').disabled = true;
                }
                if (HtmlElementById('InvoiceAmount') != null) {
                    HtmlElementById('InvoiceAmount').disabled = true;
                }
                if (HtmlElementById('freight') != null) {
                    HtmlElementById('freight').disabled = true;
                }
                /*
                if(HtmlElementById('SupplierName') != null)
                {
                HtmlElementById('SupplierName').disabled = true;
                }
                */
                if (HtmlElementById('weight') != null) {
                    HtmlElementById('weight').disabled = true;
                }
                if (HtmlElementById('Volume') != null) {
                    HtmlElementById('Volume').disabled = true;
                }
                if (HtmlElementById('Gross1') != null) {
                    HtmlElementById('Gross1').disabled = true;
                }
                if (HtmlElementById('orderdate') != null) {
                    HtmlElementById('orderdate').disabled = true;
                }
                if (HtmlElementById('orderdatedatepicker') != null) {
                    HtmlElementById('orderdatedatepicker').disabled = true;
                }
                if (HtmlElementById('insurance') != null) {
                    HtmlElementById('insurance').disabled = true;
                }
                if (HtmlElementById('currency') != null) {
                    HtmlElementById('currency').disabled = true;
                }
                if (HtmlElementById('currencybrowsebutton') != null) {
                    HtmlElementById('currencybrowsebutton').disabled = true;
                }
                if (HtmlElementById('FreightCurrencyName') != null) {
                    HtmlElementById('FreightCurrencyName').disabled = true;
                }
                if (HtmlElementById('freightcurrencybrowsebutton') != null) {
                    HtmlElementById('freightcurrencybrowsebutton').disabled = true;
                }
                if (HtmlElementById('country') != null) {
                    HtmlElementById('country').disabled = true;
                }
                if (HtmlElementById('countrybrowsebutton') != null) {
                    HtmlElementById('countrybrowsebutton').disabled = true;
                }
                if (HtmlElementById('WeightUnitOfMeasurement') != null) {
                    HtmlElementById('WeightUnitOfMeasurement').disabled = true;
                }
                if (HtmlElementById('VolumeMeasurement') != null) {
                    HtmlElementById('VolumeMeasurement').disabled = true;
                }
                if (HtmlElementById('remarks') != null) {
                    HtmlElementById('remarks').disabled = true;
                }
                if (HtmlElementById('NewInvoiceItem') != null) {
                    HtmlElementById('NewInvoiceItem').disabled = true;
                }
            }
        }
    }
}





function disableItemCtrlsForReExport(bill) {
    var dodisable = 'false';
    if (bill == 'reexport') {
        if (checkBill() == 'false') {
            //return checkOrgingType();
            var sRefItemId = MCgetAttribute("data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@RefItemId", null);
            if (sRefItemId == null || sRefItemId == '') {
                dodisable = 'false';
            }
            else {
                dodisable = 'true';
            }
        }
        else {
            dodisable = 'true';
        }
    }
    else {
        dodisable = decideDisabling(bill);
    }

    if (dodisable == 'true') {
        if (HtmlElementById('RefDeclarationNumber') != null) {

            if (HtmlElementById('RefDeclarationNumber').value == '') {

                var sStateId = MCgetAttribute("data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@StateId", null);
                var sRefItemId = MCgetAttribute("data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@RefItemId", null);

                var sRefCItemId = '';
                var strXml = xmlServiceDocument.selectSingleNode(rootNodeName + "/" + dataNodeName + "/CommercialInvoiceItemsrecords");
                strXml = OuterXML(strXml)
                var myReq = new SilentActionCall('CheckReferenceCommercialInvoiceItemsStatus', '', fireOnConditionIfExists, strXml, 'servicedocument', 'actionservice/exception');
                myReq.StartRequest();
                myReq = null;
                function fireOnConditionIfExists(xmlRes) {
                    if (xmlRes[0].getAttribute('code') != '')
                        sRefCItemId = '1';
                    else
                        sRefCItemId = '0';
                }

                if (sRefItemId != null && sRefItemId != '') {
                    if (sStateId != null && sStateId != '') {
                        if ((sStateId == 'TariffItemsCreatedState' || sStateId == 'TariffItemsModifiedState') && sRefCItemId == '0') {
                            if (HtmlElementById('hscode') != null) HtmlElementById('hscode').disabled = true;
                            if (HtmlElementById('hscodebrowsebutton') != null) HtmlElementById('hscodebrowsebutton').disabled = true;
                            if (HtmlElementById('TempExpCode') != null) HtmlElementById('TempExpCode').disabled = true;
                            if (HtmlElementById('description') != null) HtmlElementById('description').disabled = true;
                            if (HtmlElementById('country') != null) HtmlElementById('country').disabled = true;
                            if (HtmlElementById('countrybrowsebutton') != null) HtmlElementById('countrybrowsebutton').disabled = true;
                            if (HtmlElementById('HSCodeDescription') != null) HtmlElementById('HSCodeDescription').disabled = true;
                            if (HtmlElementById('totalprice') != null) HtmlElementById('totalprice').disabled = true;
                            if (HtmlElementById('unitprice') != null) HtmlElementById('unitprice').disabled = true;
                            if (HtmlElementById('txtpackagetype') != null) HtmlElementById('txtpackagetype').disabled = true;
                            if (HtmlElementById('btnPackageType') != null) HtmlElementById('btnPackageType').disabled = true;
                            if (HtmlElementById('IsRestricted') != null) HtmlElementById('IsRestricted').disabled = true;
                            //if(HtmlElementById('RestrictionRelRef') != null)HtmlElementById('RestrictionRelRef').disabled = true;
                            if (HtmlElementById('volume') != null) HtmlElementById('volume').disabled = true;
                            if (HtmlElementById('txtRestrictionName') != null) HtmlElementById('txtRestrictionName').disabled = true;
                            if (HtmlElementById('btnRestrictionType') != null) HtmlElementById('btnRestrictionType').disabled = true;
                            if (HtmlElementById('txtRestrictionId') != null) HtmlElementById('txtRestrictionId').disabled = true;
                            if (HtmlElementById('noofpackages') != null) HtmlElementById('noofpackages').disabled = true;
                            if (HtmlElementById('weight') != null) HtmlElementById('weight').disabled = true;
                            if (HtmlElementById('Gross1') != null) HtmlElementById('Gross1').disabled = true;
                            if (HtmlElementById('quantity') != null) HtmlElementById('quantity').disabled = true;
                            if (HtmlElementById('Manufacturer') != null) HtmlElementById('Manufacturer').disabled = true;
                            if (HtmlElementById('cmdConvert') != null) HtmlElementById('cmdConvert').disabled = true;
                        }
                        else {
                            if (HtmlElementById('hscode') != null) HtmlElementById('hscode').disabled = false;
                            if (HtmlElementById('hscodebrowsebutton') != null) HtmlElementById('hscodebrowsebutton').disabled = false;
                            if (HtmlElementById("browsebutton") != null) HtmlElementById("browsebutton").disabled = false;
                            if (HtmlElementById('TempExpCode') != null) HtmlElementById('TempExpCode').disabled = true;
                            if (HtmlElementById('description') != null) HtmlElementById('description').disabled = true;
                            if (HtmlElementById('country') != null) HtmlElementById('country').disabled = true;
                            if (HtmlElementById('countrybrowsebutton') != null) HtmlElementById('countrybrowsebutton').disabled = true;
                            if (HtmlElementById('HSCodeDescription') != null) HtmlElementById('HSCodeDescription').disabled = true;
                            if (HtmlElementById('totalprice') != null) HtmlElementById('totalprice').disabled = true;
                            if (HtmlElementById('unitprice') != null) HtmlElementById('unitprice').disabled = true;
                            if (HtmlElementById('txtpackagetype') != null) HtmlElementById('txtpackagetype').disabled = true;
                            if (HtmlElementById('btnPackageType') != null) HtmlElementById('btnPackageType').disabled = true;
                            if (HtmlElementById('IsRestricted') != null) HtmlElementById('IsRestricted').disabled = true;
                            if (HtmlElementById('volume') != null) HtmlElementById('volume').disabled = true;
                            if (HtmlElementById('txtRestrictionName') != null) HtmlElementById('txtRestrictionName').disabled = true;
                            if (HtmlElementById('btnRestrictionType') != null) HtmlElementById('btnRestrictionType').disabled = true;
                            if (HtmlElementById('txtRestrictionId') != null) HtmlElementById('txtRestrictionId').disabled = true;
                            if (HtmlElementById('noofpackages') != null) HtmlElementById('noofpackages').disabled = true;
                            if (HtmlElementById('weight') != null) HtmlElementById('weight').disabled = true;
                            if (HtmlElementById('Gross1') != null) HtmlElementById('Gross1').disabled = true;
                            if (HtmlElementById('quantity') != null) HtmlElementById('quantity').disabled = true;
                            if (HtmlElementById('Manufacturer') != null) HtmlElementById('Manufacturer').disabled = true;
                            if (HtmlElementById('oldunitprice') != null) HtmlElementById('oldunitprice').disabled = true;
                            if (HtmlElementById('cmdConvert') != null) HtmlElementById('cmdConvert').disabled = true;
                            if (HtmlElementById('IsExempted') != null) HtmlElementById('IsExempted').disabled = true;
                            if (HtmlElementById('volume') != null) HtmlElementById('volume').disabled = true;
                            if (HtmlElementById('OtherReleases') != null) HtmlElementById('OtherReleases').disabled = true;
                            if (HtmlElementById('ExemptionDetails') != null) HtmlElementById('ExemptionDetails').disabled = true;
                            //if(HtmlElementById('IsRestricted').checked == true)
                            //	if(HtmlElementById('RestrictionRelRef') != null)	HtmlElementById('RestrictionRelRef').disabled = false;
                            //else
                            if (HtmlElementById('RestrictionRelRef') != null)
                                HtmlElementById('RestrictionRelRef').disabled = true;
                        }
                    }
                }
                /*
                if(HtmlElementById('hscode') != null)HtmlElementById('hscode').disabled = true;
                if(HtmlElementById('hscodebrowsebutton') != null)HtmlElementById('hscodebrowsebutton').disabled = true;
                if(HtmlElementById('TempExpCode') != null)HtmlElementById('TempExpCode').disabled = true;
                if(HtmlElementById('description') != null)HtmlElementById('description').disabled = true;
                if(HtmlElementById('country') != null)HtmlElementById('country').disabled = true;
                if(HtmlElementById('countrybrowsebutton') != null)HtmlElementById('countrybrowsebutton').disabled = true;
                if(HtmlElementById('HSCodeDescription') != null)HtmlElementById('HSCodeDescription').disabled = true;
                if(HtmlElementById('totalprice') != null)HtmlElementById('totalprice').disabled = true;
                if(HtmlElementById('unitprice') != null)HtmlElementById('unitprice').disabled = true;
                if(HtmlElementById('txtpackagetype') != null)HtmlElementById('txtpackagetype').disabled = true;
                if(HtmlElementById('btnPackageType') != null)HtmlElementById('btnPackageType').disabled = true;
                if(HtmlElementById('IsRestricted') != null)HtmlElementById('IsRestricted').disabled = true;
                //if(HtmlElementById('RestrictionRelRef') != null)HtmlElementById('RestrictionRelRef').disabled = true;
                if(HtmlElementById('volume') != null)HtmlElementById('volume').disabled = true;
                if(HtmlElementById('txtRestrictionName') != null)HtmlElementById('txtRestrictionName').disabled = true;
                if(HtmlElementById('btnRestrictionType') != null)HtmlElementById('btnRestrictionType').disabled = true;
                if(HtmlElementById('txtRestrictionId') != null)HtmlElementById('txtRestrictionId').disabled = true;
                if(HtmlElementById('noofpackages') != null)	HtmlElementById('noofpackages').disabled = true;
                if(HtmlElementById('weight') != null)		HtmlElementById('weight').disabled = true;
                if(HtmlElementById('Gross1') != null)		HtmlElementById('Gross1').disabled = true;
                if(HtmlElementById('quantity') != null)		HtmlElementById('quantity').disabled = true;*/
            }
        }
    }
}
function checkRefDecId() {
    var sRefDecId = MCgetAttribute('data/Declarationsrecords/Declarations/@RefDeclarationId', '');
    if (sRefDecId != '') {
        return 'true';
    }
    else return 'false';
}

function decideDisabling(bill) {
    if (bill == 'reexport') {
        //return checkBill();
        if (checkBill() == 'false') {
            return checkOrgingType();
        }
        else {
            return 'true';
        }
    }
    else if (bill == 'tmpimport') {
        return checkRefDecId();
    }
}
function DisableClearingAgent() {
    var OrgType = MCgetAttribute('user/@OrganizationType', 'null');
    if (OrgType == 'Clearing Agents') {
        if (HtmlElementById("browsebuttonConsignee") != null)
            HtmlElementById("browsebuttonConsignee").disabled = true;
    }
}


function setTmpResCode(codes, ResCodes, frmObj) {


    //var frmObj = document.forms['itemdetails'];
    //bBlockRestrictionProhibition = 'false';
    if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {
        //added by krao for OGD Process


        HtmlElementById('btnOrgCode').style.display = '';
        HtmlElementById('btnOrgCode').value = codes;
        HtmlElementById('txtRestrictionName').value = codes;
        HtmlElementById('txtRestrictionId').value = codes;

        if (ResCodes != '') {

            HtmlElementById("RestrictionRelRef").disabled = false;
            //MakeFieldRequired(frmObj,"RestrictionRelRef",HtmlElementById("cellRestrictionRelRef"));
            if (ResCodes.indexOf("P") != -1) {


                HtmlElementById('IsRestricted').checked = false;
                HtmlElementById('IsRestricted').value = 0;

                HtmlElementById('btnOrgCode').className = 'resprobutton-pro';
                //Open Restriction detail PopUp by default for Restricted item
                var TariffItemId = HtmlElementById('TariffItemId').value;
                LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
            }
            else {


                //MakeFieldOptional(frmObj,"RestrictionRelRef",HtmlElementById("cellRestrictionRelRef"));
                HtmlElementById('btnOrgCode').className = 'resprobutton-res';
                HtmlElementById('IsRestricted').checked = true;
                HtmlElementById('IsRestricted').value = 1;
                //Open Restriction detail PopUp by default for Restricted item
                //added by krao for OGD Process
                if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE') {
                    if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
                    if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = '';
                    MakeFieldOptional(frmObj, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));

                }
                else {
                    if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = 'none';
                    if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                    MakeFieldRequired(frmObj, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                }

                var TariffItemId = HtmlElementById('TariffItemId').value;
                LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
            }
            if (ResCodes.indexOf("P") != -1 && ResCodes.indexOf("R") != -1) {


                HtmlElementById('IsRestricted').checked = true;
                HtmlElementById('IsRestricted').value = 1;
                //Open Restriction detail PopUp by default for Restricted item
                if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE') {
                    if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true; if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = '';
                    MakeFieldOptional(frmObj, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));

                }
                else {
                    if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = 'none';
                    if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                    MakeFieldRequired(frmObj, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                }

                var TariffItemId = HtmlElementById('TariffItemId').value;
                LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
            }
        }
    }
    else {

        HtmlElementById('IsRestricted').checked = false;
        HtmlElementById('IsRestricted').value = 0;
        HtmlElementById('btnOrgCode').style.display = 'none';
        HtmlElementById('txtRestrictionName').value = '';
        HtmlElementById('txtRestrictionId').value = '';
        HtmlElementById('txtRestrictionName').disabled = true;
        if (HtmlElementById('btnRestrictionType') != null)
            HtmlElementById('btnRestrictionType').disabled = true;
        HtmlElementById('RestrictionRelRef').disabled = true;
        HtmlElementById('RestrictionRelRef').value = '';
        MakeFieldOptional(frmObj, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
        MakeFieldOptional(frmObj, "txtRestrictionName", HtmlElementById("cellRestrictionType"));

        //added by krao for ogd process
        HtmlElementById('btnOrgCode').value = '';

        if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE' && HtmlElementById('IsRestricted').value == 1) {
            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
        }

        //ENDS

    }
}

function HideOrgCode() {
    var codes = '';
    var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    if (BillType == global_BillType.Import || BillType == global_BillType.Transit) {
        codes = MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@TempImpCode', '');
        if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {
            if (HtmlElementById('CCPId') != null) {
                if (HtmlElementById('CCPId').value == global_CustomsControlProcedures.CONSIGNMENT_TRACKING_FORM_FOR_LANDPORT) {
                    if (HtmlElementById('btnOrgCode') != null) HtmlElementById('btnOrgCode').style.display = 'none';
                    if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').disabled = true;
                    return false;
                }
                else {

                    HtmlElementById('btnOrgCode').style.display = '';
                    HtmlElementById('btnOrgCode').value = codes;
                    if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE') {
                        if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
                        if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = '';
                    }
                }

            }
            else {
                if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = 'none';

            }

        }
        else {
            HtmlElementById('btnOrgCode').style.display = 'none';
            //if(HtmlElementById('RelRef')!=null) HtmlElementById('RelRef').style.display='none';
            if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE' && HtmlElementById('IsRestricted').value == 1) {
                if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
            }

        }
    }
    else if (BillType == global_BillType.Export) {
        codes = MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@TempExpCode', '');
        if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {
            var isBWHFlag = 0;
            var strXml = '<Declarationsrecords DeclarationId="' + HtmlElementById('DeclarationId').value + '"></Declarationsrecords>';
            var MyReq = new SilentActionCall('CheckBWHExportBayan', '', fireOnCondition, strXml, 'servicedocument', 'actionservice/exception');
            MyReq.StartRequest();
            MyReq = null;
            function fireOnCondition(xmlRes) {
                var sErrorCode = xmlRes[0].getAttribute('code');
                if (sErrorCode == 'BWHExp001') {
                    isBWHFlag = 1;
                }
            }
            if (isBWHFlag == 1) {
                if (HtmlElementById('btnOrgCode') != null) HtmlElementById('btnOrgCode').style.display = 'none';
                if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').disabled = true;
                return false;
            }

            if (sCCPId == GBL_CustomsControlProcedures.FREEZONE.EXPORT_BILL.EXPORTFREEZONE) {
                if (HtmlElementById('btnOrgCode') != null) HtmlElementById('btnOrgCode').style.display = 'none';
                if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').disabled = true;
                return false;
            }

            HtmlElementById('btnOrgCode').style.display = '';
            HtmlElementById('btnOrgCode').value = codes;
            if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE') {
                if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
                if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = '';
            }
            else {
                if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = 'none';

            }

        }
        else {
            HtmlElementById('btnOrgCode').style.display = 'none';
            //if(HtmlElementById('RelRef')!=null) HtmlElementById('RelRef').style.display='none';
            if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE' && HtmlElementById('IsRestricted').value == 1) {
                if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
            }

        }
    }
}

function HideOrgCode_old() {
    //var frmObj = document.forms['itemdetails'];
    if (HtmlElementById('btnRestrictionType') != '') {
        HtmlElementById('btnRestrictionType').style.display = 'none';
    }

    var codes = '';
    var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    if (BillType == global_BillType.Import || BillType == global_BillType.Transit) {
        codes = MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@TempImpCode', '');
        if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {
            HtmlElementById('btnOrgCode').style.display = '';
            HtmlElementById('btnOrgCode').value = codes;
            HtmlElementById('txtRestrictionName').value = codes;
        }
        else {
            HtmlElementById('btnOrgCode').style.display = 'none';
            HtmlElementById('txtRestrictionName').value = '';
        }
    }
    else if (BillType == global_BillType.Export) {

        codes = MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@TempExpCode', '');

        if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {

            HtmlElementById('btnOrgCode').style.display = '';
            HtmlElementById('btnOrgCode').value = codes;
            HtmlElementById('txtRestrictionName').value = codes;
        }
        else {
            //HtmlElementById('txtRestrictionName').value = '';
            HtmlElementById('btnOrgCode').style.display = 'none';
        }

    }


}
function OrginTypeReferenceDecl() {
    var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    if (BillType == global_BillType.Import || BillType == global_BillType.Export) {
        if (HtmlElementById('GoodsDetectionItemsList') != null) HtmlElementById('GoodsDetectionItemsList').style.display = '';
    }
    else {
        if (HtmlElementById('GoodsDetectionItemsList') != null) HtmlElementById('GoodsDetectionItemsList').style.display = 'none';
    }

    var sOrgingType = '';
    if (HtmlElementById("orgintype") != null)
        sOrgingType = HtmlElementById("orgintype").value;
    if (sOrgingType == null || sOrgingType == '')
        sOrgingType = MCgetAttribute('data/Declarationsrecords/Declarations/@OrginTypeId', '');
    var ORGING_TYPE_NOT_KUWAIT = global_OrginType.NotKuwait;

    //Set Kuwait as Country of Origin
    var pageid = getParameter('pageid');
    if (pageid == 'ExportBillCommercialInvoiceItem' && sOrgingType == global_OrginType.Fixed) {
        if (HtmlElementById('country').value == '')
            HtmlElementById('country').value = msgDictionary('Kuwait');
        if (HtmlElementById('CountryOfOrigin').value == '')
            HtmlElementById('CountryOfOrigin').value = global_Locations.KW;
    }
    if (sOrgingType != null && sOrgingType != '') {

        if (ORGING_TYPE_NOT_KUWAIT == sOrgingType)  // Not Kuwait...Enable Refere Declaration
        {

            if (HtmlElementById('rowOldOwner') != null)
                HtmlElementById('rowOldOwner').style.display = '';

            if (HtmlElementById('nlblRefDec') != null)
                HtmlElementById('nlblRefDec').style.display = '';
            if (HtmlElementById('assrefinv') != null)
                HtmlElementById('assrefinv').style.display = '';
            if (HtmlElementById('addinvoice') != null)
                HtmlElementById('addinvoice').style.display = '';
            if (HtmlElementById('associateinvoice') != null)
                HtmlElementById('associateinvoice').style.display = 'none';

            for (var i = 0; ; i++) {
                var currRowElement = HtmlElementById('List_ExportBillCommercialInvoice_' + i + '_addItemCheck');
                if (currRowElement != null) {
                    currRowElement.disabled = true;
                }
                else break;
            }
        }
        else // Not Not Kuwait...Enable Refere Declaration false
        {
            if (HtmlElementById('rowOldOwner') != null)
                HtmlElementById('rowOldOwner').style.display = 'none';
            var IsMaqasa = HtmlElementById("IsMaqasa");
            var CCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', null);
            if (HtmlElementById('IsMaqasa') != null && IsMaqasa.checked) {
                if (IsMaqasa.checked && (CCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_LAND || CCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_SEA || CCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_AIR)) {
                    if (HtmlElementById('nlblRefDec') != null)
                        HtmlElementById('nlblRefDec').style.display = '';
                    if (HtmlElementById('assrefinv') != null)
                        HtmlElementById('assrefinv').style.display = '';
                    if (HtmlElementById('addinvoice') != null)
                        HtmlElementById('addinvoice').style.display = 'none';
                    if (HtmlElementById('associateinvoice') != null)
                        HtmlElementById('associateinvoice').style.display = 'none';

                    for (var i = 0; ; i++) {
                        var currRowElement = HtmlElementById('List_ExportBillCommercialInvoice_' + i + '_addItemCheck');
                        if (currRowElement != null) {
                            currRowElement.disabled = true;
                        }
                        else break;
                    }
                }
            }
            else {

                if (HtmlElementById('nlblRefDec') != null)
                    HtmlElementById('nlblRefDec').style.display = 'none';
                if (HtmlElementById('assrefinv') != null)
                    HtmlElementById('assrefinv').style.display = 'none';
                if (HtmlElementById('addinvoice') != null)
                    HtmlElementById('addinvoice').style.display = '';
                if (HtmlElementById('associateinvoice') != null)
                    HtmlElementById('associateinvoice').style.display = '';

                for (var i = 0; ; i++) {
                    var currRowElement = HtmlElementById('List_ExportBillCommercialInvoice_' + i + '_addItemCheck');
                    if (currRowElement != null) {
                        currRowElement.disabled = false;
                    }
                    else break;
                }
            }
        }
    }
}
function checkOrgingType() {
    var sOrgingType = '';
    if (HtmlElementById("orgintype") != null)
        sOrgingType = HtmlElementById("orgintype").value;
    if (sOrgingType == null || sOrgingType == '')
        sOrgingType = MCgetAttribute('data/Declarationsrecords/Declarations/@OrginTypeId', '');
    var ORGING_TYPE_NOT_KUWAIT = global_OrginType.NotKuwait;
    var IsMaqasa = HtmlElementById("IsMaqasa");
    var CCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', null);


    if (sOrgingType == ORGING_TYPE_NOT_KUWAIT)  // Not Kuwait...Enable Refere Declaration
    {
        return 'true';
    }

    else if (HtmlElementById('IsMaqasa') != null) {
        if (IsMaqasa.checked && (CCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_LAND || CCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_SEA || CCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_AIR)) {
            return 'true';
        }
    }

    else {
        return 'false';
    }
}
function callDeclDocsPopUp() {
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', null);
    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    var iCutOfDate = global_PNCutOfDate_DeclDocuments; //Validation For CutOfDate and Getting From Project_Const.js


    var todayDate = MCgetAttribute('data/Declarationsrecords/Declarations/@DecDateCreated', '');
    if (todayDate != null && todayDate != '') {
        todayDate = todayDate.split('T')[0];
        todayDate = todayDate.split('-')[2] + '-' + todayDate.split('-')[1] + '-' + todayDate.split('-')[0];
    }

    var sMaqasa = MCgetAttribute('data/Declarationsrecords/Declarations/@Maqasa', null);



    if (sDeclarationId != '') {
        if ((todayDate != '' && todayDate != null) && (bCompareDate(todayDate, '>=', iCutOfDate))) {
            if ((IsRoleExist("ClearingAgent") || IsRoleExist("BWHClearingAgent")) && (sStateId == 'DutyCalculatedState' || sStateId == 'DeclarationCreatedState' || sStateId == 'DeclarationRejected' || sStateId == 'DeclarationModifiedState' || sStateId == 'SubToAuditor')) {
                LockupScreen('', 'ListCCPDocumentsPopUpPg', 'OpenDeclarationRequiredDocuments', sCCPId + '~' + sDeclarationId + '~' + sStateId + '~' + sMaqasa, 950, 650, true, false);
                return false;
            }
            else {
                LockupScreen('', 'ViewCCPDocumentsPopUpPg', 'OpenDeclarationRequiredDocuments', sCCPId + '~' + sDeclarationId + '~' + sStateId + '~' + sMaqasa, 950, 650, true, false);
                return false;
            }
        }
        else {

            LockupScreen('', 'ListCCPDocumentsPopUp', 'OpenDeclarationDocuments', sCCPId + '~' + sDeclarationId + '~' + sStateId, 950, 650, true, false);
            return false;
        }
    }
}

function fnBaseSubmitFromDeclDocs(frm) {

    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);
    var actioncriteria = ProfileField('Declarations.DeclarationId', 'text') + '=\'' + sDeclarationId + '\'';
    var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');




    var sPageId = ''
    var sDeclStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);


    if (frm.id == "ApproveDeclarationByMinistryFr" || frm.id == "FeedBankDeclarationByMisFr") {
        if (BillType == global_BillType.Export)
            setParameterList(global_arrRegParameters, Array('', '', '', 'OpenDeclarationExportBill', actioncriteria, 'ViewDeclarationOGDExportBill', ''));
        else if (BillType == global_BillType.Import)
            setParameterList(global_arrRegParameters, Array('', '', '', 'OpenDeclaration', actioncriteria, 'ViewOGDSAD', ''));
        else if (BillType == global_BillType.Transit)
            setParameterList(global_arrRegParameters, Array('', '', '', 'OpenDeclaration', actioncriteria, 'ViewTransitBillOGDSAD', ''));
    }
    else if (BillType == global_BillType.Import) {
        sPageId = sDeclStateId == 'SubToAuditor' ? 'ViewSAD' : 'SAD';
        setParameterList(global_arrRegParameters, Array('', 'MoveToCreatedByDeclarationDocuments', '', 'OpenDeclaration', actioncriteria, sPageId, ''));
    }
    else if (BillType == global_BillType.Transit) {

        sPageId = sDeclStateId == 'SubToAuditor' ? 'ViewTransitBillSAD' : 'TransitBillSAD';
        setParameterList(global_arrRegParameters, Array('', 'MoveToCreatedByDeclarationDocuments', '', 'OpenDeclaration', actioncriteria, sPageId, ''));
    }
    else if (BillType == global_BillType.Export) {
        sPageId = sDeclStateId == 'SubToAuditor' ? 'ViewDeclarationExportBill' : 'EditDeclarationExportBill';
        setParameterList(global_arrRegParameters, Array('', 'MoveToCreatedByDeclarationDocuments', '', 'OpenDeclarationExportBill', actioncriteria, sPageId, ''));
    }
    pageSubmit(frm, false);
}

function callDeclVehiclesPopUp() {
    var sPageId = getParameter("pageid", "");
    var sActionPageId = MCgetAttribute('actionservice/actioncontrol/@actionpageid', '');
    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    var sBillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    var sLoginPortId = MCgetAttribute('user/@LogInPortId', '');
    var RejectCount = MCgetAttribute('data/Declarationsrecords/Declarations/@RejectCount', '');
    var DeclDate = MCgetAttribute('data/Declarationsrecords/Declarations/@DecDateCreated', '');
    var DeclOwnerOrgId = MCgetAttribute('data/Declarationsrecords/Declarations/@OwnerOrgId', '0');
    var sIDDId = MCgetAttribute('data/Declarationsrecords/Declarations/@IDDDetailId', '');
    var sIDDStateId = MCgetAttribute('data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@StateId', '');
    var sIDDReferenceType = MCgetAttribute('data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@IDDReferenceType', '');
    var LoginPortId = MCgetAttribute('user/@LogInPortId', '');
    DeclDate = DeclDate.split('T')[0];
    DeclDate = DeclDate.split('-')[2] + '-' + DeclDate.split('-')[1] + '-' + DeclDate.split('-')[0];
    var CutOffDate = 0;
    if (DeclVechEnhancedCutOffDate[LoginPortId] != null && DeclVechEnhancedCutOffDate[LoginPortId] != undefined)
        CutOffDate = DeclVechEnhancedCutOffDate[LoginPortId][0];

    if (sDeclarationId != '') {
        if (LoginPortId != global_Locations.KWI) {

            if (CutOffDate != 0 &&
                fnCheckDeclVechicleEnhancedPortsEnabled(sLoginPortId, DeclDate) && (RejectCount == '' || RejectCount == 0 || (RejectCount != 0 && bCompareDate(DeclDate, '>=', CutOffDate)))) {
                //LockupScreen('','ListDeclVehlEnhancedPopUpPg','ListDeclarationVehiclesEnhanced',sDeclarationId+'~'+sStateId+'~'+sBillType,850,500,true,false);
                if (sActionPageId == 'BrReceiptsVwPg')
                    LockupScreen(sPageId, 'ListBrDeclVehlEnhancedPopUpPg', 'ListDeclarationVehiclesEnhanced', sDeclarationId + '~' + sStateId + '~' + sBillType + '~' + sIDDId + '~' + sIDDStateId, 1000, 600, false, false);
                else
                    LockupScreen(sPageId, 'ListDeclVehlEnhancedPopUpPg', 'ListDeclarationVehiclesEnhanced', sDeclarationId + '~' + sStateId + '~' + sBillType + '~' + sIDDId + '~' + sIDDStateId, 1000, 600, false, false);
            }
            else {
                if (sActionPageId == 'BrReceiptsVwPg')
                    LockupScreen(sPageId, 'ListDeclarationVehiclesReadOnlyPopUpPg', 'ListDeclarationVehicles', sDeclarationId + '~' + sStateId + '~' + sBillType + '~' + sIDDId + '~' + sIDDStateId, 750, 500, true, false);
                else
                    LockupScreen(sPageId, 'ListDeclarationVehiclesPopUpPg', 'ListDeclarationVehicles', sDeclarationId + '~' + sStateId + '~' + sBillType + '~' + sIDDId + '~' + sIDDStateId, 750, 500, true, false);
            }
        }
        else {
            if (CutOffDate != 0 && fnCheckDeclVechicleEnhancedPortsEnabled(sLoginPortId, DeclDate) && (RejectCount == '' || RejectCount == 0 || (RejectCount != 0 && bCompareDate(DeclDate, '>=', CutOffDate)))) {
                if (sActionPageId == 'BrReceiptsVwPg')
                    LockupScreen(sPageId, 'ListBrDeclVehlEnhancedPopUpPg', 'ListDeclarationVehiclesEnhanced', sDeclarationId + '~' + sStateId + '~' + sBillType + '~' + sIDDId + '~' + sIDDStateId, 1000, 600, false, false);
                else
                    LockupScreen(sPageId, 'ListDeclVehlEnhancedPopUpPg', 'ListDeclarationVehiclesEnhanced', sDeclarationId + '~' + sStateId + '~' + sBillType + '~' + sIDDId + '~' + sIDDStateId + '~' + sIDDReferenceType, 850, 500, true, false);
            }
            else {
                if (sActionPageId == 'BrReceiptsVwPg')
                    LockupScreen(sPageId, 'ListDeclarationVehiclesReadOnlyPopUpPg', 'ListDeclarationVehicles', sDeclarationId + '~' + sStateId + '~' + sBillType + '~' + sIDDId + '~' + sIDDStateId, 750, 500, true, false);
                else
                    LockupScreen(sPageId, 'ListDeclarationVehiclesPopUpPg', 'ListDeclarationVehicles', sDeclarationId + '~' + sStateId + '~' + sBillType + '~' + sIDDId + '~' + sIDDStateId + '~' + sIDDReferenceType, 750, 500, true, false);
            }
        }
    }
    return false;
}

function CheckPopup() {
    var sIsPopupAvailable = MCgetAttribute('data/Declarationsrecords/@IsPopupAvailable', '');
    //sIsPopupAvailable= '1';
    if (sIsPopupAvailable == '1') {
        var oWindow;
        oWindow = PopUp("", "LockupScreen" + "IDDLockUpPg", 900, 300, true, false, null, null, null, null, true);
        if (oWindow.document.activeElement.innerText == '') {
            oWindow.close();
        }
        else if (oWindow != 'undefined' && oWindow != null) {
            oWindow.focus();
        }
    }

}




function viewBOL() {
    var sBillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    var sDeliveryOrderId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeliveryOrderId', null);
    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);
    if (sBillType == global_BillType.Import) {
        LockupScreen('', 'DeclartionPopUp', 'ViewCargo', ProfileField('CargoView.DeliveryOrderId', 'text') + '=\'' + sDeliveryOrderId + '\'', 850, 450, true, false);
    }
    else if (sBillType == global_BillType.Transit) {
        LockupScreen('', 'DeclartionPopUp', 'ViewCargo', ProfileField('CargoView.DeliveryOrderId', 'text') + '=\'' + sDeliveryOrderId + '\'', 850, 450, true, false);
    }
    else if (sBillType == global_BillType.Export) {
        LockupScreen('', 'DeclartionExpBillPopUp', 'ViewDeclarationDetails', ProfileField('Declarations.DeclarationId', 'text') + '=\'' + sDeclarationId + '\'', 850, 450, true, false);
    }
}


function disableInvFieldSuppMUnits() {
    var sRefInvId = MCgetAttribute('data/CommercialInvoicesrecords/CommercialInvoices/@RefInvId', '');
    if (sRefInvId != '' && sRefInvId != null) {
        //HtmlElementById('SupplierName').disabled = true;
        HtmlElementById('txtNWeightUOMDesc').disabled = true;
        HtmlElementById('btnNWeightUOM').disabled = true;
        HtmlElementById('txtVolUOMDesc').disabled = true;
        HtmlElementById('btnVolType').disabled = true;
    }
}

var totalpages;
var iStartPage;
var iEndPage;
function _setPgRangeVal() {
    iStartPage = document.forms['PageRange'].StartPage.value;
    iEndPage = document.forms['PageRange'].EndPage.value;

    exp = new RegExp("^\\s*(\\d{1,3})?\\s*$");
    m1 = iStartPage.match(exp);
    m2 = iEndPage.match(exp);
    isValid = ((m1 != null) && (m1.length < 4) && (m2 != null) && (m2.length < 4));
    iCounter = 1;
    var im1 = parseInt(m1);
    var im2 = parseInt(m2);
    if (isValid && im1 <= totalpages && im2 >= im1 && im2 <= totalpages && im2 - im1 <= parseInt(iBatchPrintSize) && im1 != 0 && im2 != 0) {
        var ownerLocId = MCgetAttribute('user/@LogInPortId', '');

        //if ( __PrintBayanByTokenPorts.indexOf(ownerLocId) > -1  && !IsRoleExist("PrintBayanOldTech") )
        if (IsThisPCwithNewBayanPrinting()) {
            var no_pages = (im2 - im1) + 1;
            CallBayanPrintingNewTech(TokenID, im1, no_pages, totalpages); // sending token id, page start and number of pages.
        }
        else {
            var refid = HtmlElementById('DeclarationId').value;

            var sDataXml = '<Declarationsrecords><Declarations StartPage="' + iStartPage + '" EndPage="' + iEndPage + '"/></Declarationsrecords>';
            printHiddenView_p3('CustomsDeclaration Report', ProfileField('Declarations.DeclarationId', 'text') + '=\'' + refid + '\'', '', 'true', '', '', '0.17,0.75,0.17,0.17', 'Fanfold 210 x 305 mm', iCounter, sDataXml, 'true');
        }
    }
    else {
        alert('Enter valid page range');
        getPageRange();
    }
}
function getPageRange() {
    //var iStartPage = prompt('Enter Start Page','1');
    //var iEndPage = prompt('Enter End Page',(parseInt(iBatchPrintSize) >= totalpages) ? totalpages:iBatchPrintSize;
    showPageInput(HtmlElementById('PrintPrePrintedBayan'), 'BayanPageRange');
    document.forms['PageRange'].StartPage.value = '1';
    document.forms['PageRange'].EndPage.value = (parseInt(iBatchPrintSize) >= totalpages) ? totalpages : iBatchPrintSize;
}
function CustomsDeclarationReport_NextRequest(iIndexer) {
    var iCounter = 1;

    //var total_times = MCgetAttribute('data/Declarationsrecords/Declarations/@BayanPageCount',1);
    //var totalpages = MCgetAttribute('data/Declarationsrecords/Declarations/@NoBatches',1);
    var refid = HtmlElementById('DeclarationId').value;
    var sDataXml = ''
    var bShowDialog = 'true';

    if (totalpages > (parseInt(iBatchPrintSize) + (iBatchPrintSize * .2))) {
        iCounter = (iIndexer == 0 ? total_times : iIndexer);
        var iEndPage = (iBatchPrintSize * (total_times - iCounter + 1));
        var iStartPage = iEndPage - iBatchPrintSize + 1;
        iEndPage = (iEndPage > totalpages ? totalpages : iEndPage);
        if (iCounter != total_times) bShowDialog = 'false';
        sDataXml = '<Declarationsrecords><Declarations StartPage="' + iStartPage + ' " EndPage="' + iEndPage + '"/></Declarationsrecords>';
    }
    printHiddenView_p3('CustomsDeclaration Report', ProfileField('Declarations.DeclarationId', 'text') + '=\'' + refid + '\'', '', 'true', '', '', '0.17,0.75,0.17,0.17', 'Fanfold 210 x 305 mm', iCounter, sDataXml, bShowDialog);
}

function IsThisPCwithNewBayanPrinting() {
    try {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        // var path = "C:\\Program Files\\MicroClearServices\\MicroClearPrint\\MicroClearPrint.exe";
        if (fso.FileExists(__BynPrnSmartClientAppPath))
            return true;
        else
            return false;
    } catch (exe) {
        return false;
    }
}

function _hideDiv() {
    var htmlDiv = HtmlElementById('BayanPageRange');
    htmlDiv.style.display = 'none';
}

function ValidateExporterNameAgainstQuota(thisObj) {
    var frmObj = thisObj.form;
    var NoOfQuotasAssociated = MCgetAttribute('data/Declarationsrecords/Declarations/@NoOfQuotasAssociated', '');
    var sIsOnlinePayAvail = MCgetAttribute('data/Declarationsrecords/Declarations/@IsOnlinePayAvail', null);
    if (sIsOnlinePayAvail == "1") {
        SiteAlert(msgDictionary('errImpExpoOP'));
        return false;
    }

    if (NoOfQuotasAssociated > 0) {
        ShowPageException('QMSQuotaDeclExcep');
        return false;
    }
    else {
        LockupScreen(frmObj.name, 'SearchDOConsignee', 'SearchConsignee', '', 750, 420, true, false);
    }
}

/*
function ValidateBayanAgainstQuota(thisObj){
var frmObj = thisObj.form;
var NoOfQuotasAssociated = MCgetAttribute('data/Declarationsrecords/Declarations/@NoOfQuotasAssociated','');
var OldConsigneeId = MCgetAttribute('data/Declarationsrecords/Declarations/@OldConsigneeId','');
var OldPortsOfLoadingId = MCgetAttribute('data/Declarationsrecords/DeclarationDetailsrecords/DeclarationDetails/@OldPortsOfLoadingId','');
var OldDestinationId = MCgetAttribute('data/Declarationsrecords/DeclarationDetailsrecords/DeclarationDetails/@OldDestinationId','');

if(HtmlElementById('ConsigneeId')!=null)
var NewConsigneeId =  HtmlElementById('ConsigneeId').value;

if(HtmlElementById('PortsOfLoadingId')!=null)
var NewPortsOfLoadingId =  HtmlElementById('PortsOfLoadingId').value;

if(HtmlElementById('DestinationId')!=null)
var NewDestinationId =  HtmlElementById('DestinationId').value;


if (NoOfQuotasAssociated > 0)
{
if(OldConsigneeId != NewConsigneeId)
{
ShowPageException('QMSExporterChange');
if(document.getElementById('consigneebrowsebutton')!=null)
document.getElementById('consigneebrowsebutton').focus();
return false;
}
if(OldPortsOfLoadingId != NewPortsOfLoadingId)
{
ShowPageException('QMSPortChange');
if(document.getElementById('LoadingPort')!=null)
document.getElementById('LoadingPort').focus();
return false;
}

if(OldDestinationId != NewDestinationId)
{
ShowPageException('QMSDESTcontChange');
if(document.getElementById('DischargePort')!=null)
document.getElementById('DischargePort').focus();
return false;
}
if((OldConsigneeId == NewConsigneeId) && (OldPortsOfLoadingId == NewPortsOfLoadingId) &&(OldDestinationId == NewDestinationId))
{
return true;
}
}
else
{
return true;
}
} */

function ValidateTempExpiryDate() {


    var dDate = MCgetAttribute('data/Declarationsrecords/Declarations/@TempAdmissionExpiredOn', '');
    dDate = dateFormatConverter(dDate, ConvertType_user2server);

    if (dDate != null && dDate != '') {
        if (bCompareDate(dDate.substring(0, 10), '<', userFormatCurrDate())) {
            alert(msgDictionary('TempExpiryDateExpired'));
            return false;
        }
        else {
            LockupScreen('', 'ImpConfrPg', 'ListCCPImportPopup', ProfileField('CCPLocations.LocationId', 'text') + '=\'' + MCgetAttribute('data/Declarationsrecords/Declarations/@LocationId', null) + '\'' + ' AND ' + ProfileField('CustomsControlProcedures.DeclarationMode', 'text') + '=' + '\'NEW\'', 500, 200, true, true);

        }
    }
}

function EnableDisableReceiptBreakDown() {
    var sDeclarationDate = MCgetAttribute('data/Declarationsrecords/Declarations/@DecDateCreated', '');
    var sPaymentFlag = false;

    if (sDeclarationDate != null && isKNETOnlinePaymentEnabled(sDeclarationDate)) {
        sPaymentFlag = true;
    }

    if (sPaymentFlag == false) {
        if (HtmlElementById('PrintDeclarationReceipts') != null) HtmlElementById('PrintDeclarationReceipts').style.display = 'none';
        if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
    }
    else {
        var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');
        var sRejCount = MCgetAttribute('data/Declarationsrecords/Declarations/@RejectCount', '0');

        if (IsRolesAvailable("ClearingAgent,ReadOnly,DR Broker,DirectReleaseAuditor,PWCSupport,Customs Operation,AuditorSupervisor,BWHClearingAgent")) {
            if (sStateId == 'DeclarationCreatedState' || sStateId == 'DeclarationCancelledState' || sStateId == 'CancelledByReqState' || (sStateId == 'DutyCalculatedState' && sRejCount <= 0)) {
                if (HtmlElementById('PrintDeclarationReceipts') != null) HtmlElementById('PrintDeclarationReceipts').style.display = 'none';
                if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
            }
            else {
                if (HtmlElementById('PrintDeclarationReceipts') != null) HtmlElementById('PrintDeclarationReceipts').style.display = '';
                if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = '';
            }
        }
        else {
            if (HtmlElementById('PrintDeclarationReceipts') != null) HtmlElementById('PrintDeclarationReceipts').style.display = 'none';
            if (HtmlElementById('ViewDeclarationReceipts') != null) HtmlElementById('ViewDeclarationReceipts').style.display = 'none';
        }

    }

    var sRows = MCgetAttribute('data/Declarationsrecords/Declarations/Paymentsrecords/Payments/PaymentTransactionsrecords/@TotalRecordsFetched', '');
    for (i = 0; i < sRows; i++) {
        if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_TypeId') != null) {
            if (MCgetAttribute('actionservice/actioncontrol/@pageid', '') == 'ViewDeclarationExportBill' || MCgetAttribute('actionservice/actioncontrol/@pageid', '') == 'ViewSAD' || MCgetAttribute('actionservice/actioncontrol/@pageid', '') == 'ViewTransitBillSAD') {
                NOCval = HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_TypeId');

                if (IsRolesAvailable("Customs Operation,ClearingAgent,ReadOnly,DirectReleaseAuditor,DR Broker,BWHClearingAgent")) {
                    if (NOCval.innerText != global_PaymentType.Bank_Receipt && !sPaymentFlag) {
                        if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown') != null) {
                            HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown').style.display = 'none';
                        }
                    }
                    else if (NOCval.innerText == global_PaymentMode.GCC_Maqasa) {
                        if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown') != null) {
                            HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown').style.display = 'none';
                        }
                    }
                    else if (NOCval.innerText == global_PaymentType.Bank_Receipt) {
                        if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown') != null) {
                            HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown').style.display = '';
                        }
                    }

                    if (NOCval.innerText != global_PayMode.NewEPayment) {
                        if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_PrintOnlineReceipt') != null) {
                            HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_PrintOnlineReceipt').style.display = 'none';
                        }
                    }
                    else if (NOCval.innerText == global_PayMode.NewEPayment) {
                        if (IsRolesAvailable("ClearingAgent,DirectReleaseAuditor,DR Broker,BWHClearingAgent")) {
                            if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_PrintOnlineReceipt') != null) {
                                HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_PrintOnlineReceipt').style.display = '';
                            }
                        }
                        else {
                            if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_PrintOnlineReceipt') != null) {
                                HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_PrintOnlineReceipt').style.display = 'none';
                            }
                        }
                    }
                }
                else {
                    if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown') != null) {
                        HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown').style.display = 'none';
                    }
                }
            }
            else {
                if (HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown') != null) {
                    HtmlElementById('List_PaymentInfoSAD' + '_' + i + '_ReceiptBreakDown').style.display = 'none';
                }
            }
        }
    }
}



function ShowChasisDupMsgRow() {
    var sCode;
    //var frm = document.forms['AddDeclarationsExportFr'];
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');
    if ((IsRoleExist("Customs Operation") || IsRoleExist("ReadOnly")) && (sStateId != 'DutyCalculatedState' && sStateId != 'DeclarationCreatedState' && sStateId != 'DeclarationRejected' && sStateId != 'DeclarationModifiedState')) {
        var strXml = xmlServiceDocument.selectSingleNode(rootNodeName + '/' + dataNodeName + '/Declarationsrecords');
        strXml = OuterXML(strXml);
        var MyReq = new SilentActionCall('CheckDuplicateChasisNo', '', fireOnCondition, strXml, 'servicedocument', 'actionservice/actioncontrol');
        MyReq.StartRequest();
        //MyReq = null;   		
        function fireOnCondition(xmlRes) {
            if (xmlRes[0].getAttribute('nextactioncriteria') != null)
                sCode = xmlRes[0].getAttribute('nextactioncriteria');
            if (sCode != null && sCode != '') {
                var msg = HtmlElementById("lblChasisDupMsg").innerText;
                msg = msg + sCode;
                // HtmlElementById("lblChasisDupMsg").innerHTML=msg;
                HtmlElementById("lblChasisDupMsg").innerHTML = '<div style="overflow:auto;word-wrap:normal;">' + msg.replace(/,/g, ', ') + '</div>';
                HtmlElementById("ChasisDupAlertMsgRow").style.display = '';
            }
            else {
                HtmlElementById("ChasisDupAlertMsgRow").style.display = 'none';
            }
        }
        //}
    }
    else {
        HtmlElementById("ChasisDupAlertMsgRow").style.display = 'none';
    }
    //return true;
}
function CheckForMaqasaPayment() {
    var isMaqasa = MCgetAttribute('data/Declarationsrecords/Declarations/@Maqasa', '');
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    if (isMaqasa == '1' && (sCCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_LAND || sCCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_SEA || sCCPId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_AIR)) {
        var xmlObj = xmlServiceDocument.selectNodes("servicedocument/data/Declarationsrecords/Declarations/Paymentsrecords/Payments/PaymentTransactionsrecords/PaymentTransactions[@selected='1']");

        if (xmlObj.length > 0) {
            for (var i = 0; i < xmlObj.length; i++) {
                if (xmlObj[i].getAttributeNode("TypeId").nodeValue == global_PaymentMode.GCC_Maqasa) {
                    alert(msgDictionary('errGCCMaqasa'));
                    return false;
                }
            }
        }
        else {
            alert(msgDictionary('NoRowsSelected'));
            return false;
        }
    }
    return true;
}

function CheckCDate() {
    var ccpId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    if (ccpId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_AIR || ccpId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_SEA
        || ccpId == global_CustomsControlProcedures.STATISTICAL_BILL_FOR_LAND) {
        var strXml = xmlServiceDocument.selectSingleNode(rootNodeName + "/" + dataNodeName + "/Declarationsrecords");
        strXml = OuterXML(strXml);
        var myReq = new SilentActionCall('CheckForMaqasaCutOffDate', '', fireOnCondition, strXml, 'servicedocument', 'actionservice/actioncontrol');
        //var myReq = new SilentActionCall('GetDeclarationDate','',fireOnCondition,strXml,'servicedocument','actionservice/exception');
        myReq.StartRequest();
        //myReq = null;
        function fireOnCondition(xmlRes) {
            var sFlag;
            if (xmlRes[0].getAttribute('nextactioncriteria') != null)
                //sCode = xmlRes[0].getAttribute('nextactioncriteria');
                sFlag = xmlTemp.selectSingleNode(rootNodeName + "/" + 'actionservice/actioncontrol').getAttribute('nextactioncriteria');
            if (sFlag == "True") {
                if (HtmlElementById('IsMaqasa') != null)
                    HtmlElementById('IsMaqasa').disabled = 'true';
                if (HtmlElementById('MaqasaAttachments') != null)
                    HtmlElementById('MaqasaAttachments').style.display = 'none';
            }
            return false;
        }
    }
}

//Added By Sthanikella for MOCI Link Action
function OpenMOCIDetatils(objType) {
    if (IsRoleExist("Customs Operation") || IsRoleExist("ReadOnly")) {
        if (objType == 'MOCIImpDetails') {
            var MOCIImportLicId = MCgetAttribute('data/Declarationsrecords/Declarations/@MOCIImportLicId', '')
            var WSIMPLICInterfaceName = MCgetAttribute('data/Declarationsrecords/Declarations/@WSIMPLICInterfaceName', '');
            if (WSIMPLICInterfaceName == 'INQUIREIMPORTLICDETAILSV2') { LockupScreen('', 'MOCIImpLicDetailsV2VwPg', 'OpenMociImpLicDetailsV2', ProfileField('MOCIImportLic.MOCIImportLicId', 'text') + '=\'' + MOCIImportLicId + '\'', 800, 600, true, false); return false; }
            else {
                LockupScreen('', 'MOCIImpLicDetailsVwPg', 'OpenMociImpLicDetails', ProfileField('MOCIImportLic.MOCIImportLicId', 'text') + '=\'' + MOCIImportLicId + '\'', 800, 600, true, false); return false;
            }
        }
        else if (objType == 'MOCIDetails') {
            var MOCICOMMLICDetId = MCgetAttribute('data/Declarationsrecords/Declarations/@MOCICOMMLICDetId', '')
            var WSCOMMLICInterfaceName = MCgetAttribute('data/Declarationsrecords/Declarations/@WSCOMMLICInterfaceName', '');
            if (WSCOMMLICInterfaceName == 'INQUIRECOMMLICDETAILSV2') { LockupScreen('', 'MOCICOMMLICDetailsV2VwPg', 'OpenMociCommLicDetailsV2', ProfileField('MOCICOMMLICDetails.MOCICOMMLICDetId', 'text') + '=\'' + MOCICOMMLICDetId + '\'', 800, 600, true, false); return false; }
            else {

                LockupScreen('', 'MOCICOMMLICDetailsVwPg', 'OpenMociCommLicDetail', ProfileField('MOCICOMMLICDetails.MOCICOMMLICDetId', 'text') + '=\'' + MOCICOMMLICDetId + '\'', 800, 600, true, false); return false;
            }
        }
    }
}



function HideActionsForBoundedInboundBayan() {
    var CCPID = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    if (CCPID == GBL_CustomsControlProcedures.AIRPORT.IMPORT_BILL.AIR_BWHInbound || CCPID == GBL_CustomsControlProcedures.SEAPORT.IMPORT_BILL.SEA_BWHInbound) {
        //Associate Duty button hide for new bwh ccp
        if (HtmlElementById("browsebutton") != null) HtmlElementById("browsebutton").style.display = 'none';
        //hide links Ministry Response Dashboard,OGD History,Additional Document Request,Sample Collection Request,Goods Detection Request,Payment Transaction new bwh ccp
        if (HtmlElementById("lnkOGADashboardRpt") != null) HtmlElementById("lnkOGADashboardRpt").style.display = 'none';
        if (HtmlElementById("OGDHistoryBy") != null) HtmlElementById("OGDHistoryBy").style.display = 'none';
        if (HtmlElementById("lnkAddDocReq") != null) HtmlElementById("lnkAddDocReq").style.display = 'none';
        if (HtmlElementById("SampleCollectionRequest") != null) HtmlElementById("SampleCollectionRequest").style.display = 'none';
        if (HtmlElementById("GoodsDetectionItemsList") != null) HtmlElementById("GoodsDetectionItemsList").style.display = 'none';
        if (HtmlElementById("paymentTransaction") != null) HtmlElementById("paymentTransaction").style.display = 'none';
        //hide Additional Document Request,Print Deposit Promissory Note,Print Deposit Promissory Note (PP) buttons for New BWH CCP
        if (HtmlElementById("lnkAddDocReq") != null) HtmlElementById("lnkAddDocReq").style.display = 'none';
        if (HtmlElementById("PrintPromissary") != null) HtmlElementById("PrintPromissary").style.display = 'none';
        if (HtmlElementById("PrintPromissaryPP") != null) HtmlElementById("PrintPromissaryPP").style.display = 'none';
    }
}




function FormatMociLinks() {
    //Added By Sthanikella for MOCI Link Appearance

    //var IsTitleRequired = false;
    //Added By Naveen Chunchu For Industrial License Links Appearance
    HideIndusTrialOnLoad();

    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    var IsDRBayan = false;
    if (sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT)
        IsDRBayan = true;

    var StatusTitle = false;


    if (!IsDRBayan && (IsRoleExist("Customs Operation") || IsRoleExist("ClearingAgent") || IsRoleExist("ReadOnly") || IsRoleExist("BWHClearingAgent"))) {

        var msgid = "";
        var sCommFlag = false;
        var sImpFlag = false;
        var sCommNoofDays = global_MOCI.Comm_Lic_NoOfDays_Validation;
        var sImpNoofDays = global_MOCI.Imp_Lic_NoOfDays_Validation;

        if (HtmlElementById("lblCommLicExpStatus") != null) {
            var MOCICommLicExpDays = MCgetAttribute('data/Declarationsrecords/Declarations/@MOCICommLicExpDays', -999)
            if (MOCICommLicExpDays >= sCommNoofDays) { msgid = "MOCIErr09"; sCommFlag = true; }
            else if (MOCICommLicExpDays > 1) msgid = "MOCIErr03";//Commercial licence got expired, Renew with in five working days from the date of expiry.
            else if (MOCICommLicExpDays == 1) msgid = "MOCIErr04"; //Commercial licence going to expired, Renew with in five working days from the date of expiry.

            if (msgid != "") {
                HtmlElementById("lblCommLicExpStatus").innerHTML = msgDictionary(msgid);
                StatusTitle = true;
            }
            else {
                if (HtmlElementById("RowMOCICommLicExpStatus") != null) HtmlElementById("RowMOCICommLicExpStatus").style.display = "none";
            }
            msgid = "";
        }
        if (HtmlElementById("lblImpLicExpStatus") != null) {
            var MOCIImpLicExpDays = MCgetAttribute('data/Declarationsrecords/Declarations/@MOCIImpLicExpDays', -999)
            if (MOCIImpLicExpDays >= sImpNoofDays) { msgid = "MOCIErr10"; sImpFlag = true; }
            else if (MOCIImpLicExpDays > 1) msgid = "MOCIErr06"; //Importer licence got expired, Renew with in five working days from the date of expiry. 			
            else if (MOCIImpLicExpDays == 1) msgid = "MOCIErr07"; //Importer licence going to expired, Renew with in five working days from the date of expiry. 							

            if (msgid != "") {
                if (sImpFlag && sCommFlag) {
                    msgid = "MOCIErr11";
                    HtmlElementById("lblCommLicExpStatus").innerHTML = msgDictionary(msgid);
                    if (HtmlElementById("RowMOCIImpLicExpStatus") != null) HtmlElementById("RowMOCIImpLicExpStatus").style.display = "none";
                }
                else {
                    HtmlElementById("lblImpLicExpStatus").innerHTML = msgDictionary(msgid);
                    StatusTitle = true;
                }
            }
            else {
                if (HtmlElementById("RowMOCIImpLicExpStatus") != null) HtmlElementById("RowMOCIImpLicExpStatus").style.display = "none";
            }
        }

    }
    if (!StatusTitle && HtmlElementById("RowMOCILicStatus") != null) {
        HtmlElementById("RowMOCILicStatus").style.display = "none";
    }

    var IsTitleRequired = false;
    if (!IsDRBayan && (IsRoleExist("Customs Operation") || IsRoleExist("ReadOnly"))) {
        var MOCICOMMLICDetId = MCgetAttribute('data/Declarationsrecords/Declarations/@MOCICOMMLICDetId', '')
        var MOCIImportLicId = MCgetAttribute('data/Declarationsrecords/Declarations/@MOCIImportLicId', '')
        var ErrorNoMOCIComm = MCgetAttribute('data/Declarationsrecords/Declarations/@ErrorNoMOCIComm', -999)
        var ErrorNoMOCIImp = MCgetAttribute('data/Declarationsrecords/Declarations/@ErrorNoMOCIImp', -999)
        if (ErrorNoMOCIComm == 1) {
            if (HtmlElementById("lblMOCICommStatus") != null) {
                var CommercialLicenseNo = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@CommercialLicenseNo', '')
                var lblMOCICommStatus = HtmlElementById("lblMOCICommStatus");
                lblMOCICommStatus.style.display = ""
                lblMOCICommStatus.innerHTML = lblMOCICommStatus.innerText.replace("@0", CommercialLicenseNo);
            }
            if (HtmlElementById("MOCICommDetails") != null) HtmlElementById("MOCICommDetails").style.display = "none";
            IsTitleRequired = true;
        }
        else if (ErrorNoMOCIComm == 0 && MOCICOMMLICDetId != '' && MOCICOMMLICDetId != '0') {
            if (HtmlElementById("MOCICommDetails") != null) HtmlElementById("MOCICommDetails").style.display = "";
            if (HtmlElementById("lblMOCICommStatus") != null) HtmlElementById("lblMOCICommStatus").style.display = "none";
            IsTitleRequired = true;
        }
        else {
            if (HtmlElementById("RowMOCICommLic") != null) HtmlElementById("RowMOCICommLic").style.display = "none";
        }

        if (ErrorNoMOCIImp == 1) {
            if (HtmlElementById("lblMOCIImpStatus") != null) {
                var ImporterLicenseNo = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@ImporterLicenseNo', '')
                var lblMOCIImpStatus = HtmlElementById("lblMOCIImpStatus");
                lblMOCIImpStatus.style.display = ""
                lblMOCIImpStatus.innerHTML = lblMOCIImpStatus.innerText.replace("@0", ImporterLicenseNo);
            }
            if (HtmlElementById("MOCIImpDetails") != null) HtmlElementById("MOCIImpDetails").style.display = "none";
            IsTitleRequired = true;
        }
        else if (ErrorNoMOCIImp == 0 && MOCIImportLicId != '' && MOCIImportLicId != '0') {
            if (HtmlElementById("MOCIImpDetails") != null) HtmlElementById("MOCIImpDetails").style.display = "";
            if (HtmlElementById("lblMOCIImpStatus") != null) HtmlElementById("lblMOCIImpStatus").style.display = "none";
            IsTitleRequired = true;
        }
        else {
            if (HtmlElementById("RowMOCIImpLic") != null) HtmlElementById("RowMOCIImpLic").style.display = "none";
        }
    }
    else {
        if (HtmlElementById("RowMOCIImpLic") != null) HtmlElementById("RowMOCIImpLic").style.display = "none";
        if (HtmlElementById("RowMOCICommLic") != null) HtmlElementById("RowMOCICommLic").style.display = "none";
    }
    if (!IsTitleRequired && HtmlElementById("RowMOCITittle") != null) {
        HtmlElementById("RowMOCITittle").style.display = "none";
    }
}


function HideIndusTrialOnLoad() {
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    var IsDRBayan = false;
    if (sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT)
        IsDRBayan = true;

    var isAuditor = IsRoleExist("Customs Operation");
    var isIndustrial = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@IsIndustrial', '');
    if (IsDRBayan || !isAuditor || isIndustrial != '1') {
        if (HtmlElementById('RowIndTittle') != null)
            HtmlElementById('RowIndTittle').style.display = 'none';
        if (HtmlElementById('RowIndLic') != null)
            HtmlElementById('RowIndLic').style.display = 'none';
        if (HtmlElementById('lnkIndLic') != null)
            HtmlElementById('lnkIndLic').style.display = 'none';
    }
}

function openIndLic() {
    var isAuditor = IsRoleExist("Customs Operation");
    var isIndustrial = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@IsIndustrial', '');
    var OrgId = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@OrganizationId', '');
    var IndLicNo = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@IndustrialLicenseNo', '');
    var isManual = MCgetAttribute('data/Declarationsrecords/OrganizationsForDeclarationrecords/OrganizationsForDeclaration/@IsManual', '');

    if (isAuditor && isIndustrial == '1') {
        if (isManual != '1')
            LockupScreen('', 'IndustrialLicenseVwPg', 'OpenIndLicDetails', IndLicNo + '~' + OrgId, 1000, 500, true, false);
        else if (isManual == '1')
            LockupScreen('', 'ViewIndustrialOrganization', 'ViewOrganization', ProfileField('Organizations.OrganizationId', 'text') + '=N\'' + OrgId + '\'', 850, 350, true, false);

    }
}

function ShowDeclarationDateCreatedAlertMessage() {

    if (IsRolesAvailable("ChiefInspector,InspectorSupervisor,Customs APRT MGR,Customs PRT MGR,Inspector,Customs Operation,SecureBayanBlocking,RMSAdmin")) {
        var sDeclNumber = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationNumber', null);

        var declCreateddays;
        var sDeclDateCreatedServerFrmt = MCgetAttribute('data/Declarationsrecords/Declarations/@DecDateCreated', null);;
        if (sDeclDateCreatedServerFrmt != null && sDeclDateCreatedServerFrmt != '') {

            var sDeclDateTimeCreatedSplit = sDeclDateCreatedServerFrmt.split('T');
            var sDeclDateCreatedSplit = sDeclDateTimeCreatedSplit[0].split('-');
            var sDeclDateCreated = new Date(userDateFormat(sDeclDateCreatedSplit[0], sDeclDateCreatedSplit[2], sDeclDateCreatedSplit[1]));
            if (sDeclNumber == '') {
                var sCurrentDate = new Date(userDateFormat(dServerDate.getFullYear(), dServerDate.getDate(), dServerDate.getMonth() + 1))
                declCreateddays = (sCurrentDate - sDeclDateCreated) / (1000 * 60 * 60 * 24);
            }
            else {
                var sDeclDateCreatedSubmitFrmt = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationDate', null);
                var sDeclarationCreatedafterSubmit = sDeclDateCreatedSubmitFrmt.split('T');
                var sDeclDateSubmitSplit = sDeclarationCreatedafterSubmit[0].split('-');
                var sdeclSubmitDate = new Date(userDateFormat(sDeclDateSubmitSplit[0], sDeclDateSubmitSplit[2], sDeclDateSubmitSplit[1]));
                declCreateddays = (sdeclSubmitDate - sDeclDateCreated) / (1000 * 60 * 60 * 24);
            }

            if (declCreateddays == 0) {
                $("#lblDeclCreatedDaysalert").html(subscrip(msgDictionary('errDecldateZeroDays'), new Array(declCreateddays.toString())));
                $('#lblDeclCreatedDaysalert').css('color', 'limegreen'); // message will display in green color
                $("#DeclarationCreatedMessageAlert").show();
                //$("#DeclarationCreatedMessageAlert").hide();
            }
            else if (declCreateddays <= 2 && declCreateddays > 0) {
                $("#lblDeclCreatedDaysalert").html(subscrip(msgDictionary('errDecldateCreatedAlertMessage'), new Array(declCreateddays.toString())));
                $('#lblDeclCreatedDaysalert').css('color', 'limegreen'); // message will display in green color
                $("#DeclarationCreatedMessageAlert").show();
            }
            else if (declCreateddays > 2 && declCreateddays <= 4) {
                $("#lblDeclCreatedDaysalert").html(subscrip(msgDictionary('errDecldateCreatedAlertMessage'), new Array(declCreateddays.toString())));
                $('#lblDeclCreatedDaysalert').css("color", "Orange"); // message will display in orange color
                $("#DeclarationCreatedMessageAlert").show();
            }
            else if (declCreateddays > 4) {
                $("#lblDeclCreatedDaysalert").html(subscrip(msgDictionary('errDecldateCreatedAlertMessage'), new Array(declCreateddays.toString())));
                $("#DeclarationCreatedMessageAlert").show();
            }
            else {
                $("#DeclarationCreatedMessageAlert").hide();
            }
        }
        else {
            $("#DeclarationCreatedMessageAlert").hide();
        }
    }
}



function ValidateManufacturer(text) {
    var MinLength = 5;
    var SpecialChars = "\/().,&\\-";
    var AllowedChars = "a-zA-Z\u0600-\u06FF";
    var NumericChars = "0-9";
    var SpaceChar = "\\s";
    var Exp = new RegExp("[" + SpaceChar + SpecialChars + "]", "g");
    var stext = text.replace(Exp, '');
    if (!(stext.length < MinLength)) {
        Exp = new RegExp("^[" + NumericChars + SpaceChar + SpecialChars + "]+$", "g");
        if (!(Exp.test(text))) {
            Exp = new RegExp("[" + SpecialChars + "]", "g");
            var AllowedExp = new RegExp("[" + AllowedChars + NumericChars + "]", "g");
            if (((text.match(Exp) || []).length) < ((text.match(AllowedExp) || []).length)) {
                Exp = new RegExp("^[" + AllowedChars + SpaceChar + NumericChars + SpecialChars + "]+$", "g");
                return Exp.test(text);
            }
        }
    }
    return false;
}



//Added by naveen to Restrict changing Importer/Exporter Once Online Payment Is Initiated.
function BrowseConsignee(frmObj) {
    var sIsOnlinePayAvail = MCgetAttribute('data/Declarationsrecords/Declarations/@IsOnlinePayAvail', null);
    if (sIsOnlinePayAvail == "1") {
        SiteAlert(msgDictionary('errImpExpoOP'));
        return false;
    }
    else {
        LockupScreen(frmObj.name, 'SearchDOConsignee', 'SearchConsignee', '', 750, 400, true, false);
    }
}
//End by naveen to Restrict changing Importer/Exporter Once Online Payment Is Initiated.


//function ValidatePaymnet(sDutyType)
//{
//var sflag = true;
//if(sDutyType.indexOf (',1,')>-1)
//{
//if(($("#CustomsDuty")!=null && $("#CustomsDuty").val()!='') || ($("#HandlingCharges")!=null && $("#HandlingCharges").val()!='') || ($("#Storage")!=null && $("#Storage").val()!='') || ($("#Penalties")!=null && $("#Penalties").val()!='') || ($("#Certificates")!=null && $("#Certificates").val()!='') || ($("#Printing")!=null && $("#Printing").val()!='') || ($("#Others")!=null && $("#Others").val()!=''))
//{
//SiteAlert(msgDictionary('errEpayValidateRevenue'));
//sflag = false;
//return false;
//}
//}
//else if(sDutyType.indexOf (',2,')>-1)
//{
//if($("#Guarantees")!=null && $("#Guarantees").val()!='')
//{
//SiteAlert(msgDictionary('errEpayValidateDeposit'));
//sflag = false;
//return false;
//}
//}
//return sflag;
//}


function ValidatePaymnet(sDutyType) {
    var sflag = true;
    if (sDutyType.indexOf(',1,') > -1) {
        if (($("#CustomsDuty") != null && $("#CustomsDuty").val() != '' && $("#CustomsDuty").val() > 0) || ($("#HandlingCharges") != null && $("#HandlingCharges").val() != '' && $("#HandlingCharges").val() > 0) || ($("#Storage") != null && $("#Storage").val() != '' && $("#Storage").val() > 0) || ($("#Penalties") != null && $("#Penalties").val() != '' && $("#Penalties").val() > 0) || ($("#Certificates") != null && $("#Certificates").val() != '' && $("#Certificates").val() > 0) || ($("#Printing") != null && $("#Printing").val() != '' && $("#Printing").val() > 0) || ($("#Others") != null && $("#Others").val() != '' && $("#Others").val() > 0)) {
            SiteAlert(msgDictionary('errEpayValidateRevenue'));
            sflag = false;
            return false;
        }
    }
    else if (sDutyType.indexOf(',2,') > -1) {
        if ($("#Guarantees") != null && $("#Guarantees").val() != '' && $("#Guarantees").val() > 0) {
            SiteAlert(msgDictionary('errEpayValidateDeposit'));
            sflag = false;
            return false;
        }
    }
    return sflag;
}



function ValidateReceipts() {
    var sErrorCode = '';
    var refid = HtmlElementById('DeclarationId').value;

    var strXml = xmlServiceDocument.selectSingleNode(rootNodeName + "/" + dataNodeName + "/Declarationsrecords");
    strXml = OuterXML(strXml)
    var MyReq = new SilentActionCall('ValidateReceiptServices', '', fireOnConditionReceipts, strXml, 'servicedocument', 'actionservice/exception');
    MyReq.StartRequest();
    MyReq = null;

    function fireOnConditionReceipts(xmlRes) {
        if (xmlRes[0].getAttribute('code') != '') {
            sErrorCode = xmlRes[0].getAttribute('code');
            if (sErrorCode == 'RECDEER') {
                var sErrorMsg = msgDictionary('RECDEER');
                alert(sErrorMsg);
                return false;
            }
            else if (sErrorCode == 'RECDE22') {
                var sErrorMsg = msgDictionary('RECDE22');
                alert(sErrorMsg);
                return false;
            }
            else if (sErrorCode == 'RECDE23') {
                var sErrorMsg = msgDictionary('RECDE23');
                alert(sErrorMsg);
                return false;
            }
            else if (sErrorCode == 'errInsNotPaid') {
                var sErrorMsg = msgDictionary('errInsNotPaid');
                alert(sErrorMsg);
                return false;
            }
            else if (sErrorCode.indexOf('SFEENP') == 0) {
                var sErrorMsg = msgDictionary(sErrorCode);
                alert(sErrorMsg);
                return false;
            }
            else if (sErrorCode == 'errServicesNotPaid') {
                var sParams = xmlRes[0].getAttribute('context_value');
                var sErrorMsg = msgDictionary('errAppServicesNotPaid').replace('@0', sParams);
                alert(sErrorMsg);
                return false;
            }
            if (sErrorCode != '') return false;
        }
    }
    if (sErrorCode != '') { return false; }
    return true;
}


function callAdditionalDocumentsRequest() {
    var sDeclId = HtmlElementById('DeclarationId').value;
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    MCsetAttribute('actionservice /actioncontrol/@templateid', sDeclId);
    MCsetAttribute('actionservice/actioncontrol/@previousactioncriteria', sStateId);
    LockupScreen('ViewSAD', 'AdditionalDocRequestLsPg', 'ListAdditionalDocRequest', ProfileField('AdditionalDocRequest.DeclarationId', 'text') + '=\'' + MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null) + '\'', 1200, 500, true, false);
    return false;
}

function checkIDD(action) {
    var sIDDDetailId = MCgetAttribute("data/Declarationsrecords/Declarations/@IDDDetailId", null);
    if (sIDDDetailId == null || sIDDDetailId == '')
        return true;
    var sStateId = MCgetAttribute('data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@StateId', '');
    var sDecStatelId = MCgetAttribute("data/Declarationsrecords/Declarations/@StateId", null);
    var sGovt = MCgetAttribute("data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@IsGovt", null);
    var sIDDRefType = MCgetAttribute("data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@IDDReferenceType", null);

    //if(sIDDDetailId == '' || sIDDDetailId ==null || sIDDRefType == 'HB')
    //{
    //  if (sIDDRefType == 'HB')
    // {
    //   if(document.getElementById('consigneebrowsebutton')!=null)document.getElementById('consigneebrowsebutton').disabled=true;
    //  }
    //    return true;
    //}

    if (sIDDRefType != null && sIDDRefType == 'HB') {
        if ((action == 'EditConsignee')) {
            alert(msgDictionary('IDD001'));
            return false;
        }
        return true;
    }



    if ((sIDDDetailId != '' && sIDDDetailId != null)) {
        if (action == 'EditConsignee') {
            if (sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsCancelledState') {
                return true;
            }
            else if (sStateId == 'IDDDetailsApprovedtate' || sStateId == 'IDDDetailsReleasedState') {
                alert(msgDictionary('IDD001'));
                return false;
            }
            else {
                alert(msgDictionary('IDD001'));
                return false;
            }
        }
        if (action == 'Edit') {
            //if(sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsCancelledState')
            if ((sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsCancelledState') || ((sStateId == 'IDDDetailsApprovedtate' || sStateId == 'IDDDetailsReleasedState') && sGovt == '1')) {
                return true;
            }
            else {
                alert(msgDictionary('IDD001'));
                return false;
            }
        }
        if (action == 'DutyCalculate') {
            if ((sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsCancelledState' || sStateId == 'IDDDetailsReleasedState' || sStateId == 'IDDDetailsClosedState' || ((sStateId == 'IDDDetailsApprovedtate' || sStateId == 'IDDDetailsReleasedState') && sGovt == '1')) && (sDecStatelId == 'DeclarationRejected' || sDecStatelId == 'DeclarationModifiedState' || sDecStatelId == 'DeclarationCreatedState' || sDecStatelId == 'DutyCalculatedState')) {
                return true;
            }
            else if ((sStateId == 'IDDDetailsApprovedtate' || sStateId == 'IDDDetailsReleasedState') && sGovt == '1') {
                return true;
            }

            else {
                alert(msgDictionary('IDD001'));
                return false;
            }
        }
        if (action == 'Submit') {
            if (sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsReleasedState' || sStateId == 'IDDDetailsCancelledState' || sStateId == 'IDDDetailsClosedState') {
                return true;
            }
            else {
                alert(msgDictionary('IDD004'));
                return false;
            }
        }
        if (action == 'DeleteCINV' || action == 'NewCINV' || action == 'DeleteCINV' || action == 'NewCII') {
            //if(sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsCancelledState')
            if ((sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsCancelledState') || ((sStateId == 'IDDDetailsApprovedtate' || sStateId == 'IDDDetailsReleasedState') && sGovt == '1')) {
                return true;
            }
            else {
                alert(msgDictionary('IDD007'));
                return false;
            }
        }
        if (action == 'Cancel') {
            if (IsRoleExist("Customs PRT MGR") || IsRoleExist("Customs APRT MGR")) {
                if (sStateId == 'IDDDetailsCreatedState' || sStateId == 'IDDDetailsCancelledState' || sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsSubmittedState') {
                    return true;
                }
                else {
                    alert(msgDictionary('IDD006'));
                    return false;
                }
            }
            else {
                if (sStateId == 'IDDDetailsCreatedState' || sStateId == 'IDDDetailsCancelledState' || sStateId == 'IDDDetailsRejectedState') {
                    return true;
                }
                else {
                    alert(msgDictionary('IDD006'));
                    return false;
                }
            }
        }
    }
}

function HidenShowIDDExitsAlert() {
    var sIDDDetailId = MCgetAttribute("data/Declarationsrecords/Declarations/@IDDDetailId", null);
    if (sIDDDetailId != '' && sIDDDetailId != null) {
        $('#IDDExists').show();
    }
    else
        $('#IDDExists').hide();
}

function HideControlsForIDDForCII() {
    var sIDDDetailId = MCgetAttribute("data/Declarationsrecords/Declarations/@IDDDetailId", null);
    var sStateId = MCgetAttribute('data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@StateId', '');
    var sIDDRefType = MCgetAttribute("data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@IDDReferenceType", null);
    var sGovt = MCgetAttribute("data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@IsGovt", '');
    //if((sStateId == 'IDDDetailsRejectedState' || sStateId == 'IDDDetailsCancelledState') || ((sStateId == 'IDDDetailsApprovedtate' || sStateId == 'IDDDetailsReleasedState') && sGovt == '1'))
    if ((sIDDDetailId != '' && sIDDDetailId != null && sIDDRefType != 'HB') && (sStateId != 'IDDDetailsRejectedState' && sStateId != 'IDDDetailsCancelledState') && sGovt != '1') {
        _disableControlls('AddItemFromB2Form', 'hscodebrowsebutton', 'hscode', 'description', 'country', 'countrybrowsebutton', 'oldunitprice', 'noofpackages', 'quantity');
        _disableControlls('weight', 'IsRestricted', 'RestrictionRelRef', 'RelRef', 'IsExempted', 'txtExemptionBnf', 'IncludeGCCDeposit', 'volume', 'quantity1', 'TaricDescription');
        _disableControlls('hscodebrowsebutton', 'OtherReleases', 'ExemptionRef', 'txtExemptionName', 'btnExemptionType', 'ExemptionDetails', 'txtRestrictionName', 'btnRestrictionType', 'Gross1', 'txtqtytype');
        _disableControlls('cmdConvert', 'txtpackagetype', 'btnPackageType', 'Manufacturer', 'BatterySize', 'AntiDumpingManufacturer');
    }
}

function silentCallIDD() {

    var frm = document.forms['TaxesandDuties'];
    var strXml = '';
    var strXml = xmlServiceDocument.selectSingleNode(rootNodeName + "/" + dataNodeName + "/Declarationsrecords");
    strXml = OuterXML(strXml)

    var myReq = new SilentActionCall('CheckDecValidationsForIDD', '', fireOnConditionIfExists, strXml, 'servicedocument', 'actionservice/exception');
    myReq.StartRequest();
    myReq = null;


    var sIDDDetailId = MCgetAttribute("data/Declarationsrecords/Declarations/@IDDDetailId", null);
    if (sIDDDetailId != null && sIDDDetailId != "") {
        var sDeclId = MCgetAttribute("data/Declarationsrecords/Declarations/@DeclarationId", null);
        MCsetAttribute('data/Declarationsrecords/@IsPopupAvailable', '1');
        LockupScreen('TaxesandDuties', 'IDDLockUpPg', 'GetNewIDD', sDeclId, 800, 400, true, true);
    }
    else {

        function fireOnConditionIfExists(xmlRes) {
            var sErrorCode = xmlRes[0].getAttribute('code');
            if (sErrorCode == '') {
                var sDeclId = MCgetAttribute("data/Declarationsrecords/Declarations/@DeclarationId", null);
                //var sIDDDetailId = MCgetAttribute("data/Declarationsrecords/Declarations/@IDDDetailId", null);
                MCsetAttribute('data/Declarationsrecords/@IsPopupAvailable', '1');
                LockupScreen('TaxesandDuties', 'IDDLockUpPg', 'GetNewIDD', sDeclId, 800, 400, true, true);
            }
            else if (sErrorCode == 'errDecVehContNotAssociated') {
                var sPlateNo = xmlRes[0].getAttribute('context_value');
                var msg = (msgDictionary('errDecVehContNotAssociated')).replace(/@0/g, sPlateNo);
                alert(msg);
            }
            else if (sErrorCode == 'DDC0026') {
                var sInvoiceNo = xmlRes[0].getAttribute('context_value');
                var msg = (msgDictionary('DDC0026')).replace(/@0/g, sInvoiceNo);
                alert(msg);
            }
            else if (sErrorCode == 'DDC0014') {
                alert(msgDictionary('IDDINV001'));
                return false;
            }
            else if (sErrorCode == 'DDC0075') {
                alert(msgDictionary('IDDGW001'));
                return false;
            }
            else if (sErrorCode == 'DDC00147') {
                alert(msgDictionary('IDDRDoc'));
                return false;
            }
            else {
                alert(msgDictionary(sErrorCode));
                return false;
            }
        }
    }
}


function onclickReferedLink() {
    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId');
    ShowRSViewerForPage('GetRefDeclarationsReport', '[Declarations].[DeclarationId]=N\'' + sDeclarationId + '\''); return false;
}


function IsDrBroker() {
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '');
    var sDRBroker = IsRoleExist("DR Broker");
    if (sDRBroker && !sStateId == 'SubToAuditor') {
        if (HtmlElementById("next") != null) HtmlElementById("next").style.display = 'none';
    }
}


function ValidateConsigneeForRSF() {
    var sOrg = HtmlElementById('ConsigneeId').value;
    var strBrXml = xmlServiceDocument.selectSingleNode(rootNodeName + "/" + dataNodeName + "/Declarationsrecords");
    strBrXml = OuterXML(strBrXml);
    strBrXml = strBrXml + '<Declarationrecords><Declaration OrganizationId="' + sOrg + '"  /> </Declarationrecords>';
    var MyReq = new SilentActionCall('RSFValidateConsignee', '', fireOnVerifyCondition, strBrXml, 'servicedocument', 'actionservice/exception');
    var bReturn = true;
    MyReq.StartRequest();
    MyReq = null;
    function fireOnVerifyCondition(xmlRes) {
        if (xmlRes[0].getAttribute('code') != null) {
            if (xmlRes[0].getAttribute('code') == 'RSFValConErrMsg') {
                SiteAlert(msgDictionary('RSFValConErrMsg'));
                bReturn = false;
                return false;
            }
            else
                return true;
        }
    }
    return bReturn;
}

function HidebuttonsforCustomspaycollections() {
    sListcount = xmlServiceDocument.selectNodes("servicedocument/data/Declarationsrecords/Declarations/Paymentsrecords/Payments/PaymentTransactionsrecords/PaymentTransactions");
    var sactionpageid = MCgetAttribute('actionservice/actioncontrol/@actionpageid', '');
    if (IsRoleExist("Customs Reviewer") && (sactionpageid == 'CustomsPaymentCollectionsVwPg' || sactionpageid == 'CustomsOnlinePaymentsVwPg' || sactionpageid == 'CustomsPaymentCollectionsLsPg' || sactionpageid == 'CustomsOnlinePaymentsLsPg' || sactionpageid == 'ORDCustomsPaymentCollectionsVwPg' || sactionpageid == 'ORDCustomsPaymentCollectionsLsPg')) {
        $("#prnAtt,#btnCompose,#btnRunPrintPreview").hide();
        $("#close").show();
        for (var i = 0; sListcount.length > i; i++) {
            if (HtmlElementById('List_' + 'PaymentInfoSAD' + '_' + i + '_' + 'NotUsed') != null) {
                HtmlElementById('List_' + 'PaymentInfoSAD' + '_' + i + '_' + 'NotUsed').style.display = 'none';
            }
        }
    }
    else {
        $("#prnAtt,#btnCompose,#btnRunPrintPreview").show();
        $("#close").hide();
    }
}

function viewGoodsDetection_Export() {
    var sTempDec = MCgetAttribute('data/Declarationsrecords/Declarations/@TempDeclNumber', null);
    var sDecId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);
    var sDOId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeliveryOrderId', null);
    var sConsigneeId = MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeId', null);
    var sConsigneeType = MCgetAttribute('data/Declarationsrecords/Declarations/@ConsigneeType', null);
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    var sManifestId = '';
    var sTempData = sDecId + '~' + sDOId + '~' + sConsigneeId + '~' + sConsigneeType + '~' + sManifestId + '~' + sStateId + '~' + sDecId + '~' + 'EDC' + '~' + sTempDec;
    MCsetAttribute('actionservice/actioncontrol/@templateid', sTempData);
    LockupScreen('TaxesandDuties', 'GoodsDetectionLookupLsPg', 'ListGoodsDetection', ProfileField('GoodsDetectionForm.DeclarationId', 'text') + '=\'' + sDecId + '\'', 950, 600, true, false);
}


function HideRMSInfo() {
    var sroleExists = IsRolesExist("Customs Operation,DirectReleaseAuditor,AuditorSupervisor,Customs PRT MGR,Customs APRT MGR,DirectReleaseAuditorSupervisor,Inspector,InspectorSupervisor,ChiefInspector,ReadOnly");
    var sChannel = MCgetAttribute('data/Declarationsrecords/Declarations/@Channel', '');
    var objCell = HtmlElementById('chnlLight');
    if (sroleExists && sChannel != '' && objCell != null) {
        var sImageURL = objCell.innerHTML;
        if (sChannel == GBL_Types.RMSChannelTypes.RED) {

            sImageURL = sImageURL.replace("BlueIcon_RMS", "RedIcon _RMS");
        }
        if (sChannel == GBL_Types.RMSChannelTypes.GREEN) {
            sImageURL = sImageURL.replace("BlueIcon_RMS", "GreenIcon_RMS");
        }
        if (sChannel == GBL_Types.RMSChannelTypes.YELLOW) {
            sImageURL = sImageURL.replace("BlueIcon_RMS", "YellowIcon_RMS");
        }
        objCell.innerHTML = sImageURL;
    }
    else {
        if (HtmlElementById('chnlLight') != null)
            HtmlElementById('chnlLight').style.display = 'none';
        if (HtmlElementById('chnlCaption') != null)
            HtmlElementById('chnlCaption').style.display = 'none';
    }
    if (sroleExists) {
        if (HtmlElementById('AssesReport') != null)
            HtmlElementById('AssesReport').style.display = '';
        if (HtmlElementById('lnkAssessmentDetails') != null)
            HtmlElementById('lnkAssessmentDetails').style.display = '';
    }
    else {
        if (HtmlElementById('AssesReport') != null)
            HtmlElementById('AssesReport').style.display = 'none';
        if (HtmlElementById('lnkAssessmentDetails') != null)
            HtmlElementById('lnkAssessmentDetails').style.display = 'none';
    }
    if (HtmlElementById('chnlLight') != null)
        HtmlElementById('chnlLight').style.display = 'none';
}


function CallDeclarationAEOList() {
    var sDeclId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', '');
    MCsetAttribute('actionservice/actioncontrol/@templateid', sDeclId);

    var baseformanme = 'DeclartionAEOAssociate'
    var sStateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId');
    if (!(sStateId == 'DeclarationCreatedState' || sStateId == 'DutyCalculatedState' || sStateId == 'DeclarationRejected' || sStateId == 'DeclarationModifiedState')) {
        baseformanme = 'DeclartionAEOAssociatehide';
    }
    LockupScreen(baseformanme, 'DeclarationAEOListLsPg', 'ListDeclarationAEOList', sDeclId, 1100, 600, true, false); return false;
}

$(window).load(function () {
    var OGDExists = MCgetAttribute('data/Declarationsrecords/Declarations/@AEOListExists', 'n');
    if (OGDExists == 'y') {
        $('#AEOListExistsRow').show();
    }
    else {
        $('#AEOListExistsRow').hide();
    }
    var KWOGDExists = MCgetAttribute('data/Declarationsrecords/Declarations/@KuwaitAEOListExists', 'n');
    if (KWOGDExists == 'y') {
        $('#KuwaitAEOListExistsRow').show();
    }
    else {
        $('#KuwaitAEOListExistsRow').hide();
    }

});


//Script id : ControlReadOnly


function disableHSCodeDesc(frmName) {
    var frm = document.forms[frmName];
    //Start - Code Added By MohanKumar on 14-Oct-2013 - Broker can edit the Invoice Item Goods Description of all Bayan Types(Except DR Bayan)
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    var isDRAuditor = IsRoleExist("DirectReleaseAuditor");
    var isClearingAgent = IsRoleExist("ClearingAgent");
    var TariffItemId = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@TariffItemId', '');
    var isDRBroker = IsRoleExist("DR Broker");

    if (frm.name == 'ExportBillCommercialInvoiceItem' || frm.name == 'itemdetails') {
        //added by sthanikella to enable editing of goods desc for Dr Bayans 7-jan-2015
        if (TariffItemId != null && TariffItemId != '' && (isDRAuditor == true || isDRBroker == true) && ((sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT))) {
            if (HtmlElementById('description') != null) HtmlElementById('description').disabled = false;
        }
        else if ((sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT && sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT && sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT) && (isClearingAgent == true || IsRoleExist("BWHClearingAgent"))) {
            if (HtmlElementById('description') != null) {
                HtmlElementById('description').disabled = false;
                //frm.description.value = "";
            }
        }
        else {
            if (HtmlElementById('description') != null) {
                HtmlElementById('description').disabled = true;
            }
        }
    }
    //End - Code Added By MohanKumar on 14-Oct-2013 - Broker can edit the Invoice Item Goods Description of all Bayan Types(Except DR Bayan)
    // Code Added BY Chandra for Disabling the Goods Description for the Refered Bayans -Starts -02/04/2014
    var sRefCINVItemId = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@RefItemId', '')
    var sRefTariffStateId = MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@StateId', '');
    if (sRefCINVItemId != null && sRefCINVItemId != '' && (sRefTariffStateId == 'TariffItemsCreatedState' || sRefTariffStateId == 'TariffItemsModifiedState')) {
        if (HtmlElementById('description') != null) {
            HtmlElementById('description').disabled = true;
            HtmlElementById('hscode').disabled = true;
            HtmlElementById('hscodebrowsebutton').disabled = true;
        }
    }
    // Code Added BY Chandra for Disabling the Goods Description for the Refered Bayans -Ends -02/04/2014
}




function ControlReadOnly(frmname, control) {
    var frm = document.forms[frmname];
    if (frmname == "RiskTargetActions") {
        var objControl = document.forms[frmname].elements[control];
        if (objControl != null)
            objControl.disabled = true;
    }

    if (HtmlElementById('txtstartdate') != null) {
        if (!(bCompareDate(frm.txtstartdate.value, '>', userFormatCurrDate()))) {
            if (MCgetAttribute('data/RiskTargetsrecords/RiskTargets/@StateId', '') != null) {
                var sStateId = MCgetAttribute('data/RiskTargetsrecords/RiskTargets/@StateId', '');
                if (sStateId == "RiskTargetsActivatedState" || sStateId == "RiskTargetsDeactivatedState") {
                    if (HtmlElementById('riskname') != null) HtmlElementById('riskname').disabled = true;
                    if (HtmlElementById('Description') != null) HtmlElementById('Description').disabled = true;
                    if (HtmlElementById('browsebuttonrisk') != null) HtmlElementById('browsebuttonrisk').disabled = true;
                    if (HtmlElementById('browsebuttonCriteria') != null) HtmlElementById('browsebuttonCriteria').disabled = true;
                    if (HtmlElementById('EditCriteria') != null) HtmlElementById('EditCriteria').disabled = true;
                    if (HtmlElementById('NewCriteria') != null) HtmlElementById('NewCriteria').disabled = true;
                    if (HtmlElementById('lnkViewBOL') != null) HtmlElementById('lnkViewBOL').disabled = true;
                    if (HtmlElementById('lnkNewViewBOL') != null) HtmlElementById('lnkNewViewBOL').disabled = true;
                    if (HtmlElementById('RTFor') != null) HtmlElementById('RTFor').disabled = true;
                    //if(HtmlElementById('ccpname')!= null)HtmlElementById('ccpname').disabled = true;
                    if (HtmlElementById('Import') != null) HtmlElementById('Import').disabled = true;
                    if (HtmlElementById('Export') != null) HtmlElementById('Export').disabled = true;
                    if (HtmlElementById('ImportAndExport') != null) HtmlElementById('ImportAndExport').disabled = true;
                    if (HtmlElementById('txtstartdate') != null) HtmlElementById('txtstartdate').disabled = true;
                    if (HtmlElementById('FromDatePicker') != null) HtmlElementById('FromDatePicker').disabled = true;
                    _disableControlls('txtFromDateHrs', 'txtFromDateMin');
                    if (sStateId != "RiskTargetsDeactivatedState") {
                        if (HtmlElementById('RMSVisibility') != null) HtmlElementById('RMSVisibility').disabled = true;
                        if (HtmlElementById('HitRate') != null) HtmlElementById('HitRate').disabled = true;
                        if (HtmlElementById('txtenddate') != null) HtmlElementById('txtenddate').disabled = true;
                        if (HtmlElementById('ExpiryDatePicker') != null) HtmlElementById('ExpiryDatePicker').disabled = true;
                        _disableControlls('txtFromDateHrs', 'txtFromDateMin', 'txtToDateHrs', 'txtToDateMin', 'riskImpact', 'txtstartdate', 'FromDatePicker');
                    }
                }
            }
        }
    }
}

function CheckReadOnlyforRestriction(frmName) {
    var frm = document.forms[frmName];
    var phase = MCgetAttribute('data/Declarationsrecords/CustomsControlProceduresrecords/CustomsControlProcedures/@Phase', '');
    if (phase == '3') {
        if (HtmlElementById('IsRestricted') != null)
            HtmlElementById('IsRestricted').disabled = true;
        if (HtmlElementById('txtRestrictionName') != null)
            HtmlElementById('txtRestrictionName').disabled = true;
        if (HtmlElementById('btnRestrictionType') != null)
            HtmlElementById('btnRestrictionType').style.display = 'none';

        if (HtmlElementById('IsRestricted').checked == 1) {
            if (HtmlElementById('RestrictionRelRef') != null)
                HtmlElementById('RestrictionRelRef').disabled = false;

            setRestrictionName();
        }
        else {
            if (HtmlElementById('RestrictionRelRef') != null)
                HtmlElementById('RestrictionRelRef').disabled = true;

            MakeFieldOptional(frm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
        }
    }
    else {
        if (HtmlElementById('IsRestricted').checked == 1) {
            MakeFieldRequired(frm, "txtRestrictionName", HtmlElementById("cellRestrictionType"));
            MakeFieldRequired(frm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
            var sCusResName = MCgetAttribute('data/CommercialInvoiceItemsrecords/CustomsRestrictionTyperecords/CustomsRestrictionType/@Name', '');
            HtmlElementById('txtRestrictionName').value = sCusResName;
        }
    }
    CheckReadOnlyforExemption(frmName);
}
function setRestrictionName() {
    var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    var codes = '';
    if (BillType == global_BillType.Import || BillType == global_BillType.Transit) {
        codes = MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@TempImpCode', '');
        if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {
            HtmlElementById('txtRestrictionName').value = codes;
        }
        else {
            HtmlElementById('txtRestrictionName').value = '';
        }
    }
    else if (BillType == global_BillType.Export) {
        codes = MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@TempExpCode', '');
        if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {
            HtmlElementById('txtRestrictionName').value = codes;
        }
        else {
            HtmlElementById('txtRestrictionName').value = '';
        }
    }
}
function CheckReadOnlyforExemption(frmName) {
    var frm = document.forms[frmName];
    if (frmName != 'ExportBillCommercialInvoiceItem') {
        if (frm.IsExempted.checked == 1) {
            frm.elements['txtExemptionName'].disabled = false;
            if (frm.elements['btnExemptionType'] != null)
                frm.elements['btnExemptionType'].disabled = false;
            frm.elements['ExemptionRef'].disabled = false;
            frm.elements['txtExemptionBnf'].disabled = false;
            if (frm.elements['btnExemptionBnf'] != null)
                frm.elements['btnExemptionBnf'].disabled = false;
            MakeFieldRequired(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
            MakeFieldRequired(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
            MakeFieldRequired(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
        }
        else {
            frm.txtExemptionId.value = '';
            frm.txtExemptionName.value = '';
            frm.elements['txtExemptionName'].disabled = true;
            if (frm.elements['btnExemptionType'] != null)
                frm.elements['btnExemptionType'].disabled = true;
            frm.elements['ExemptionRef'].disabled = true;
            if (frm.txtExemptionBnfId != null)
                frm.txtExemptionBnfId.value = '';
            if (frm.txtExemptionBnf != null)
                frm.txtExemptionBnf.value = '';
            if (frm.txtExemptionBnf != null)
                frm.elements['txtExemptionBnf'].disabled = true;
            if (frm.elements['btnExemptionBnf'] != null)
                frm.elements['btnExemptionBnf'].disabled = true;
            MakeFieldOptional(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
            MakeFieldOptional(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
            if (frm.txtExemptionBnf != null)
                MakeFieldOptional(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
        }
    }
}

function CheckReadOnlyforRestriction_old(frmName) {
    var frm = document.forms[frmName];

    var phase = MCgetAttribute('data/Declarationsrecords/CustomsControlProceduresrecords/CustomsControlProcedures/@Phase', '');

    if (phase == '2') {
        if (HtmlElementById('IsRestricted') != null) HtmlElementById('IsRestricted').disabled = false;

    }
    else {
        if (HtmlElementById('IsRestricted') != null) HtmlElementById('IsRestricted').disabled = true;
    }

    if (frm.IsRestricted.checked == 1) {
        //frm.elements['txtRestrictionName'].disabled=false;
        frm.elements['txtRestrictionName'].disabled = true;

        if (frm.elements['btnRestrictionType'] != null) {
            frm.elements['btnRestrictionType'].disabled = false;
            frm.elements['btnRestrictionType'].style.display = '';
        }

        frm.elements['RestrictionRelRef'].disabled = false;
        if (frm.elements['txtExemptionBnf'] != null) frm.elements['txtExemptionBnf'].disabled = false;

        MakeFieldRequired(frm, "txtRestrictionName", HtmlElementById("cellRestrictionType"));
        MakeFieldRequired(frm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
    }
    else {
        frm.txtRestrictionId.value = '';
        //frm.txtRestrictionName.value='';
        frm.elements['txtRestrictionName'].disabled = true;
        if (frm.elements['btnRestrictionType'] != null) frm.elements['btnRestrictionType'].disabled = true;
        frm.elements['RestrictionRelRef'].disabled = true;
        MakeFieldOptional(frm, "txtRestrictionName", HtmlElementById("cellRestrictionType"));
        MakeFieldOptional(frm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
    }

    if (frmName != 'ExportBillCommercialInvoiceItem') {
        if (frm.IsExempted.checked == 1) {
            frm.elements['txtExemptionName'].disabled = false;
            if (frm.elements['btnExemptionType'] != null) frm.elements['btnExemptionType'].disabled = false;
            frm.elements['ExemptionRef'].disabled = false;
            frm.elements['txtExemptionBnf'].disabled = false;
            if (frm.elements['btnExemptionBnf'] != null) frm.elements['btnExemptionBnf'].disabled = false;
            MakeFieldRequired(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
            MakeFieldRequired(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
            MakeFieldRequired(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
        }
        else {
            frm.txtExemptionId.value = '';
            frm.txtExemptionName.value = '';
            frm.elements['txtExemptionName'].disabled = true;
            if (frm.elements['btnExemptionType'] != null) frm.elements['btnExemptionType'].disabled = true;
            frm.elements['ExemptionRef'].disabled = true;
            if (frm.txtExemptionBnfId != null)
                frm.txtExemptionBnfId.value = '';
            if (frm.txtExemptionBnf != null)
                frm.txtExemptionBnf.value = '';
            if (frm.txtExemptionBnf != null)
                frm.elements['txtExemptionBnf'].disabled = true;
            if (frm.elements['btnExemptionBnf'] != null) frm.elements['btnExemptionBnf'].disabled = true;
            MakeFieldOptional(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
            MakeFieldOptional(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
            if (frm.txtExemptionBnf != null)
                MakeFieldOptional(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
        }
    }
}

function EnableDiableExcemptionFor(frmname) {
    if (frmname != 'ExportBillCommercialInvoiceItem') {
        var frm = document.forms[frmname];
        if (frm.IsExempted.checked == 1) {
            frm.txtExemptionName.disabled = false;
            if (frm.btnExemptionType != null) frm.btnExemptionType.disabled = false;
            frm.ExemptionRef.disabled = false;
            frm.txtExemptionBnf.disabled = false;
            if (frm.btnExemptionBnf != null) frm.btnExemptionBnf.disabled = false;
            MakeFieldRequired(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
            MakeFieldRequired(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
            MakeFieldRequired(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
        }
        else {
            frm.txtExemptionId.value = '';
            frm.txtExemptionName.value = '';
            frm.txtExemptionName.disabled = true;
            if (frm.btnExemptionType != null) frm.btnExemptionType.disabled = true;
            frm.ExemptionRef.disabled = true;
            frm.ExemptionRef.value = '';
            if (frm.txtExemptionBnfId != null)
                frm.txtExemptionBnfId.value = '';
            if (frm.txtExemptionBnf != null) {
                frm.txtExemptionBnf.value = '';
                frm.txtExemptionBnf.disabled = true;
            }
            if (frm.btnExemptionBnf != null) frm.btnExemptionBnf.disabled = true;
            MakeFieldOptional(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
            MakeFieldOptional(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
            MakeFieldOptional(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
        }
    }
}

function EnableDiableExcemptionFor_old(frmname) {
    if (frmname != 'ExportBillCommercialInvoiceItem') {
        var frm = document.forms[frmname];

        if (frm.IsExempted.checked == 1) {
            if (frm.txtExemptionName != null) {
                if (frm.txtExemptionName.disabled == true) {
                    frm.txtExemptionName.disabled = false;
                    if (frm.btnExemptionType != null) frm.btnExemptionType.disabled = false;
                    frm.ExemptionRef.disabled = false;
                    frm.txtExemptionBnf.disabled = false;
                    if (frm.btnExemptionBnf != null) frm.btnExemptionBnf.disabled = false;
                    MakeFieldRequired(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
                    MakeFieldRequired(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
                    MakeFieldRequired(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
                }
                else {
                    frm.txtExemptionId.value = '';
                    frm.txtExemptionName.value = '';
                    frm.txtExemptionName.disabled = true;
                    if (frm.btnExemptionType != null) frm.btnExemptionType.disabled = true;
                    frm.ExemptionRef.disabled = true;
                    if (frm.txtExemptionBnfId != null)
                        frm.txtExemptionBnfId.value = '';
                    if (frm.txtExemptionBnf != null) {
                        frm.txtExemptionBnf.value = '';
                        frm.txtExemptionBnf.disabled = true;
                    }
                    if (frm.btnExemptionBnf != null) frm.btnExemptionBnf.disabled = true;
                    MakeFieldOptional(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
                    MakeFieldOptional(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
                    MakeFieldOptional(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
                }
            }
        }
        else {
            if (frm.txtExemptionName != null) {
                frm.txtExemptionId.value = '';
                frm.txtExemptionName.value = '';
                frm.txtExemptionName.disabled = true;
                if (frm.btnExemptionType != null) frm.btnExemptionType.disabled = true;
                frm.ExemptionRef.disabled = true;
                frm.ExemptionRef.value = '';
                if (frm.txtExemptionBnfId != null)
                    frm.txtExemptionBnfId.value = '';
                if (frm.txtExemptionBnf != null) {
                    frm.txtExemptionBnf.value = '';
                    frm.txtExemptionBnf.disabled = true;
                }
                if (frm.btnExemptionBnf != null) frm.btnExemptionBnf.disabled = true;
                MakeFieldOptional(frm, "ExemptionRef", HtmlElementById("CellExemptionRef"));
                MakeFieldOptional(frm, "txtExemptionName", HtmlElementById("CelllselExcemptionFor"));
                MakeFieldOptional(frm, "txtExemptionBnf", HtmlElementById("CelllselExcemptionBnf"));
            }
        }
    }
}

function EnableDiableCustomRestriction(frmname) {
    var frm = document.forms[frmname];

    if (frm.IsRestricted.checked == 1) {
        //if(frm.txtRestrictionName!=null)
        //{						
        //if(frm.txtRestrictionName.disabled==true)
        //{
        frm.txtRestrictionName.disabled = false;

        if (frm.btnRestrictionType != null) {
            frm.btnRestrictionType.style.display = '';
            frm.btnRestrictionType.disabled = false;
        }

        frm.RestrictionRelRef.disabled = false;
        MakeFieldRequired(frm, "txtRestrictionName", HtmlElementById("cellRestrictionType"));

        /*
        }
        else
        {
        	
            frm.txtRestrictionId.value='' ;
            //frm.txtRestrictionName.value='';						
            frm.txtRestrictionName.disabled=true;
            //if (frm.btnRestrictionType != null) frm.btnRestrictionType.disabled=true;
            if (frm.btnRestrictionType != null) frm.btnRestrictionType.disabled=false;
            frm.RestrictionRelRef.disabled=true;
            MakeFieldOptional(frm,"txtRestrictionName",HtmlElementById("cellRestrictionType"));
            MakeFieldOptional(frm,"RestrictionRelRef",HtmlElementById("cellRestrictionRelRef"));
        }*/
        //}					
    }
    else {
        //if(frm.txtRestrictionName!=null)
        //{
        frm.txtRestrictionId.value = '';
        //frm.txtRestrictionName.value='';				
        frm.txtRestrictionName.disabled = true;
        if (frm.btnRestrictionType != null) frm.btnRestrictionType.disabled = true;
        frm.RestrictionRelRef.disabled = true;
        frm.RestrictionRelRef.value = '';
        MakeFieldOptional(frm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
        MakeFieldOptional(frm, "txtRestrictionName", HtmlElementById("cellRestrictionType"));
        //}
    }

}
//Script id : LoadPrintingHelper

//Script id : AutoAlignLinksSc

//Added by Pavan to Re align Links in screen automatically --start
function RealignLinks(holderid, sId, colMax) {
    var holder1 = $("#" + holderid)[0];
    var sIdAr = sId.split(",");
    //var colMax = 3;
    var colCount = 0;
    var rowMax = Math.ceil(sIdAr.length / colMax);
    if ($("#" + holderid + '_table').length == 0) {
        var table = $('<table id="' + holderid + '_table" width="100%" class=\'linkstable\'>').addClass('foo');
        var i = 0;
        for (var ridx = 0; ridx < rowMax; ridx++) {
            if (colCount < sIdAr.length) {
                row = $('<tr id="' + holderid + '_table_r_' + ridx + '" >').addClass('bar')
                for (var c = 0; c < colMax; c++) {
                    var cell = $('<td class=\"linkcell\" id="' + holderid + '_table_c_' + i + '\">').text("");
                    row.append(cell);
                    i++;
                }
                table.append(row);
            }
        }
    }
    $("#" + holderid).append(table);
    var cp = 0;
    $("#" + holderid + "_table >tr").hide();
    for (var i = 0; i < sIdAr.length; i++) {
        var el = $(sIdAr[i])
        //if (el.css("display") != "none" && el.css("visibility") != "hidden") {
        //if (el.css("display") == "inline") {
        if (el.css("display") != "none" && el.css("display") != undefined && el.css("visibility") != "hidden" && el.css("visibility") != undefined) {
            var cellId = holderid + '_table_c_' + cp;
            $(sIdAr[i]).detach().appendTo("#" + cellId);
            $("#" + cellId).parent('tr').show();
            cp++;
        }
    }
    return;
}
//Added by Pavan to Re align Links in screen automatically --end

$(function () {
    if (typeof (MutationObserver) != 'undefined') {
        observerHideLinks = new MutationObserver(callbackHide);
        if (typeof (sId) != 'undefined') {
            $(sId).each(function (e) {
                observerHideLinks.observe(this, {
                    attributes: true, //configure it to listen to attribute changes
                    attributeOldValue: true
                });
            })
        }
    }
    else {
        if (typeof (sId) != 'undefined') {
            var sIdAr = sId.replace(/ /g, '').replace(/#/g, '').split(",");
            for (var i = 0; i < sIdAr.length; i++) {
                var el = document.getElementById(sIdAr[i]);
                if (el) el.attachEvent("onpropertychange", selectionChanged);
            }
        }
    }
    RealignLinks(holderId, sId, 3);
});

function selectionChanged(event) {
    //console.log(event.propertyName);
    if (event.propertyName == "style.display" || event.propertyName == "style.visibility") {
        //console.log("use onpropertychange:element is hidden");

        //the variable holderId must be at global scope
        RealignLinks(holderId, sId, 3);
    }
}

var observerHideLinks;
function callbackHide(mutationList) {
    mutationList.forEach(function (mutation) {
        switch (mutation.type) {
            case "attributes":
                var ss = mutation.target.style
                //ss.display.oldValue = ss.display;
                for (i = 0; i < ss.length; i++) {
                    if (ss[i] == "display" || ss[i] == "visibility") {
                        //console.log("use MutationObserver:element is hidden");
                        //the variable holderId must be at global scope
                        RealignLinks(holderId, sId, 3);
                    }
                }
        }
    });
}

//Script in View, id: SadAndCommercialInvoices


holderId = "CellLinksHolder";


var sId = "#addbrowsebutton, #transactionhistory, #lnkVwBol, #viewCCPReqDocs, #DeclarationVehicles, #ContainerDetails, #ViewDeclarationReceipts, #Refered, " +
    "#nlblInspectionReg, #lblInspectionReg, #paymentTransaction, #transitroute, #RejectionHistory, #renewalHistory, #ItemsForDocsMiss, #MaqasaAttachments,#lnkDeclarationAEOList";







function callDeclarationReceipts() {
    LockupScreen('', 'DeclarationReceiptsLsPg', 'ListDeclarationReceipt', ProfileField('DeclarationReceipts.DeclarationId', 'text') + '=\'' + MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null) + '\'', 1000, 500, true, false);
    return false;
}


function hideLinks() {
    var rejectCount = MCgetAttribute('data/Declarationsrecords/Declarations/@RejectCount', null);

    var TEMPORARY_ADMISSION_BILL_FOR_AIRPORT = global_CustomsControlProcedures.TEMPORARY_ADMISSION_BILL_FOR_AIRPORT;
    var TEMPORARY_ADMISSION_BILL_FOR_SEAPORT = global_CustomsControlProcedures.TEMPORARY_ADMISSION_BILL_FOR_SEAPORT;
    var TEMPORARY_ADMISSION_BILL_FOR_LANDPORT = global_CustomsControlProcedures.TEMPORARY_ADMISSION_BILL_FOR_LANDPORT;

    var TEMPORARY_IMPORT_BILL_FOR_AIRPORT = global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_AIRPORT;
    var TEMPORARY_IMPORT_BILL_FOR_SEAPORT = global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_SEAPORT;
    var TEMPORARY_IMPORT_BILL_FOR_LANDPORT = global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_LANDPORT;

    var LANDED_BY_MISTAKE_FOR_AIRPORT_WITH_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_AIRPORT_WITH_DO;
    var LANDED_BY_MISTAKE_FOR_SEAPORT_WITH_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_SEAPORT_WITH_DO;
    var LANDED_BY_MISTAKE_FOR_LANDPORT_WITH_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_LANDPORT_WITH_DO;

    var LANDED_BY_MISTAKE_FOR_AIRPORT_WITHOUT_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_AIRPORT_WITHOUT_DO;
    var LANDED_BY_MISTAKE_FOR_SEAPORT_WITHOUT_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_SEAPORT_WITHOUT_DO;
    var LANDED_BY_MISTAKE_FOR_LANDPORT_WITHOUT_DO = global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_LANDPORT_WITHOUT_DO;

    var GENERAL_TRANSIT_BILL_FOR_AIRPORT = global_CustomsControlProcedures.GENERAL_TRANSIT_BILL_FOR_AIRPORT;
    var GENERAL_TRANSIT_BILL_FOR_SEAPORT = global_CustomsControlProcedures.GENERAL_TRANSIT_BILL_FOR_SEAPORT;
    var GENERAL_TRANSIT_BILL_FOR_LANDPORT = global_CustomsControlProcedures.GENERAL_TRANSIT_BILL_FOR_LANDPORT;

    var TRANSIT_BILL_FOR_AIRPORT = global_CustomsControlProcedures.TRANSIT_BILL_FOR_AIRPORT;
    var TRANSIT_BILL_FOR_SEAPORT = global_CustomsControlProcedures.TRANSIT_BILL_FOR_SEAPORT;
    var TRANSIT_BILL_FOR_LANDPORT = global_CustomsControlProcedures.TRANSIT_BILL_FOR_LANDPORT;

    var DIRECT_RELEASE_BILL_FOR_AIRPORT = global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT;
    var DIRECT_RELEASE_BILL_FOR_SEAPORT = global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT;
    var DIRECT_RELEASE_BILL_FOR_LANDPORT = global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT;

    var RE_EXPORT_BILL_FOR_AIRPORT = global_CustomsControlProcedures.RE_EXPORT_BILL_FOR_AIRPORT;
    var RE_EXPORT_FOR_IMPORT_BILL_FOR_SEAPORT = global_CustomsControlProcedures.RE_EXPORT_FOR_IMPORT_BILL_FOR_SEAPORT;
    var RE_EXPORT_FOR_IMPORT_BILL_FOR_LANDPORT = global_CustomsControlProcedures.RE_EXPORT_FOR_IMPORT_BILL_FOR_LANDPORT;

    var TEMPORARY_IMPORT_BILL_FOR_FREEZONE = global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_FREEZONE;

    var CCPID = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', 'text');
    var sExpiryPeriod = MCgetAttribute('data/Declarationsrecords/Declarations/@ExpiryPeriod', 'text');
    var PortTypes_SeaPort = global_PortTypes.SeaPort;
    var PortTypes = MCgetAttribute('data/Declarationsrecords/CustomsControlProceduresrecords/CustomsControlProcedures/@LocationTypeTypeId', 'text');
    if (PortTypes == PortTypes_SeaPort) {
        if (HtmlElementById('ContainerDetails') != null)
            HtmlElementById('ContainerDetails').style.display = '';
    }
    else {
        if (HtmlElementById('ContainerDetails') != null)
            HtmlElementById('ContainerDetails').style.display = 'none';
    }

    if (rejectCount > 0) {
        if (HtmlElementById('RejectionHistory') != null)
            HtmlElementById('RejectionHistory').style.display = '';
        if (HtmlElementById('LatestRejectionHistory') != null)
            HtmlElementById('LatestRejectionHistory').style.display = '';
    }
    else {
        if (HtmlElementById('RejectionHistory') != null)
            HtmlElementById('RejectionHistory').style.display = 'none';
        if (HtmlElementById('LatestRejectionHistory') != null)
            HtmlElementById('LatestRejectionHistory').style.display = 'none';
    }


    if (CCPID == TEMPORARY_IMPORT_BILL_FOR_AIRPORT || CCPID == TEMPORARY_IMPORT_BILL_FOR_SEAPORT || CCPID == TEMPORARY_IMPORT_BILL_FOR_LANDPORT || CCPID == TEMPORARY_IMPORT_BILL_FOR_FREEZONE) {
        if (HtmlElementById('renewalHistory') != null)
            HtmlElementById('renewalHistory').style.display = '';
        if (HtmlElementById('rowAdditionalInfo1') != null)
            HtmlElementById('rowAdditionalInfo1').style.display = '';
        if (HtmlElementById('rowAdditionalInfo2') != null)
            HtmlElementById('rowAdditionalInfo2').style.display = '';
    }
    else if (CCPID == DIRECT_RELEASE_BILL_FOR_AIRPORT || CCPID == DIRECT_RELEASE_BILL_FOR_SEAPORT || CCPID == DIRECT_RELEASE_BILL_FOR_LANDPORT) {
        if (HtmlElementById('viewCCPReqDocs') != null) {
            HtmlElementById('viewCCPReqDocs').style.display = 'none';
        }
        if (HtmlElementById('ItemsForDocsMiss') != null) {
            HtmlElementById('ItemsForDocsMiss').style.display = 'none';
        }
        if (sExpiryPeriod == null || sExpiryPeriod == '') {
            if (HtmlElementById('rowAdditionalInfo1') != null)
                HtmlElementById('rowAdditionalInfo1').style.display = 'none';
            if (HtmlElementById('rowAdditionalInfo2') != null)
                HtmlElementById('rowAdditionalInfo2').style.display = 'none';
            if (HtmlElementById('renewalHistory') != null)
                HtmlElementById('renewalHistory').style.display = 'none';

        }
        else {
            if (HtmlElementById('rowAdditionalInfo1') != null)
                HtmlElementById('rowAdditionalInfo1').style.display = '';
            if (HtmlElementById('rowAdditionalInfo2') != null)
                HtmlElementById('rowAdditionalInfo2').style.display = '';
            if (HtmlElementById('renewalHistory') != null)
                HtmlElementById('renewalHistory').style.display = '';

        }
        if (HtmlElementById('renewalHistory') != null)
            HtmlElementById('renewalHistory').style.display = 'none';
    }
    else if (CCPID == RE_EXPORT_BILL_FOR_AIRPORT || CCPID == RE_EXPORT_FOR_IMPORT_BILL_FOR_SEAPORT || CCPID == RE_EXPORT_FOR_IMPORT_BILL_FOR_LANDPORT) {
        if (HtmlElementById('nlblRefDec') != null)
            HtmlElementById('nlblRefDec').style.display = '';

        if (HtmlElementById('RefDeclarationNumber') != null) HtmlElementById('RefDeclarationNumber').disabled = true;
        if (HtmlElementById('RefDeclarationDate') != null) HtmlElementById('RefDeclarationDate').disabled = true;
        if (HtmlElementById('RefDeclarationDateDatePicker') != null) HtmlElementById('RefDeclarationDateDatePicker').disabled = true;

        if (HtmlElementById('rowStatics') != null)
            HtmlElementById('rowStatics').style.display = 'none';
    }
    else {
        if (HtmlElementById('renewalHistory') != null)
            HtmlElementById('renewalHistory').style.display = 'none';
        if (HtmlElementById('rowAdditionalInfo1') != null)
            HtmlElementById('rowAdditionalInfo1').style.display = 'none';
        if (HtmlElementById('rowAdditionalInfo2') != null)
            HtmlElementById('rowAdditionalInfo2').style.display = 'none';
    }

    var rejectCount = MCgetAttribute('data/Declarationsrecords/Declarations/@RejectCount', null);

    if (rejectCount > 0) {
        if (HtmlElementById('rowReject') != null)
            HtmlElementById('rowReject').style.display = '';
        if (HtmlElementById('RejectionHistory') != null) HtmlElementById('RejectionHistory').style.display = '';
    }
    else {
        if (HtmlElementById('rowReject') != null)
            HtmlElementById('rowReject').style.display = 'none';
        if (HtmlElementById('RejectionHistory') != null) HtmlElementById('RejectionHistory').style.display = 'none';
    }

    if (MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@TempImpCode', 'text') == '') {
        if (HtmlElementById('TempImpCode') != null) {
            HtmlElementById('TempImpCode').outerHTML = '';
        }
    }
    var sImpRes = MCgetAttribute('data/CommercialInvoiceItemsrecords/HSCodeForDeclarationrecords/HSCodeForDeclaration/@ImpRes', 'text');
    if (sImpRes.indexOf("R") != -1) {
        if (HtmlElementById('btnOrgCode') != null)
            HtmlElementById('btnOrgCode').className = 'resprobutton-res';
    }
    else if (sImpRes.indexOf("P") != -1) {
        if (HtmlElementById('btnOrgCode') != null)
            HtmlElementById('btnOrgCode').className = 'resprobutton-pro';
    }

    if (CCPID == LANDED_BY_MISTAKE_FOR_AIRPORT_WITH_DO || CCPID == LANDED_BY_MISTAKE_FOR_SEAPORT_WITH_DO || CCPID == LANDED_BY_MISTAKE_FOR_LANDPORT_WITH_DO
        || CCPID == LANDED_BY_MISTAKE_FOR_AIRPORT_WITHOUT_DO || CCPID == LANDED_BY_MISTAKE_FOR_SEAPORT_WITHOUT_DO || CCPID == LANDED_BY_MISTAKE_FOR_LANDPORT_WITHOUT_DO) {
        if (HtmlElementById('viewCCPReqDocs') != null)
            HtmlElementById('viewCCPReqDocs').style.display = 'none';

        if (HtmlElementById('ItemsForDocsMiss') != null)
            HtmlElementById('ItemsForDocsMiss').style.display = 'none';

        if (HtmlElementById('browsebutton') != null)
            HtmlElementById('browsebutton').style.display = 'none';
    }
    if (CCPID == TRANSIT_BILL_FOR_AIRPORT || CCPID == TRANSIT_BILL_FOR_SEAPORT || CCPID == TRANSIT_BILL_FOR_LANDPORT) {
        if (HtmlElementById('DirectPassRow') != null)
            HtmlElementById('DirectPassRow').style.display = '';

        if (HtmlElementById('transitroute') != null)
            HtmlElementById('transitroute').style.display = '';

    }
    else {
        if (HtmlElementById('DirectPassRow') != null)
            HtmlElementById('DirectPassRow').style.display = 'none';


        if (HtmlElementById('transitroute') != null)
            HtmlElementById('transitroute').style.display = 'none';

    }
    var sForMaqasa = MCgetAttribute('data/Declarationsrecords/Declarations/@Maqasa', null);
    if (sForMaqasa == 0 || sForMaqasa == "") {
        if (HtmlElementById('RowMaqasa') != null)
            HtmlElementById('RowMaqasa').style.display = 'none';
        if (HtmlElementById('MaqasaAttachments') != null) HtmlElementById('MaqasaAttachments').style.display = 'none';
    }
    else {
        if (HtmlElementById('RowMaqasa') != null)
            HtmlElementById('RowMaqasa').style.display = '';
        if (HtmlElementById('MaqasaAttachments') != null) HtmlElementById('MaqasaAttachments').style.display = '';
    }

    //Added By Jones - 16-Sep-2011 - To Show List HBItems Link Only if RefDeclarationId is not Null
    var sRefDeclId = MCgetAttribute("data/Declarationsrecords/Declarations/@RefDeclarationId", null);
    if (sRefDeclId == null || sRefDeclId == '') {
        for (j = 0; obj = HtmlElementById('List_' + 'taricinvoiceitems' + '_' + j + '_' + 'ListDeclaredHBItems') != null; j++) {
            HtmlElementById('List_' + 'taricinvoiceitems' + '_' + j + '_ListDeclaredHBItems').style.display = 'none';
        }
    }
    //Added By Jones - Ends
    //Added By Jones - 27-Sep-2011 - To Show Red Bullets Image Only if IsPriceAbnormal = 1
    for (var jr = 0; obj = HtmlElementById('List_' + 'taricinvoiceitems' + '_' + jr + '_' + 'IsPriceAbnormal') != null; jr++) {
        if (HtmlElementById('List_' + 'taricinvoiceitems' + '_' + jr + '_' + 'Cell_Icon') != null) {
            if (HtmlElementById('List_' + 'taricinvoiceitems' + '_' + jr + '_' + 'IsPriceAbnormal').innerText == 'true') {
                HtmlElementById('List_' + 'taricinvoiceitems' + '_' + jr + '_' + 'Cell_Icon').all[0].src += 'Bullet_Red.gif';
            }
            else {
                HtmlElementById('List_' + 'taricinvoiceitems' + '_' + jr + '_' + 'Cell_Icon').all[0].src += 'spacer.gif';
                //HtmlElementById('List_'+'taricinvoiceitems'+'_'+jr+'_Cell_Icon').style.display = 'none';
            }
        }



    }
    //Added By Jones - Ends
    if (FnIsDocsMissingForInvItemsAllowedCCPs(CCPID)) {
        if (HtmlElementById('ItemsForDocsMiss') != null)
            HtmlElementById('ItemsForDocsMiss').style.display = '';
    }
    else {
        if (HtmlElementById('ItemsForDocsMiss') != null)
            HtmlElementById('ItemsForDocsMiss').style.display = 'none';
    }



}
function DisableBack() {
    history.go(+1);
}

function ViewMaqasaAttachments() {
    var StateId = MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', null);
    var sDeclarationId = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', null);

    if (StateId == '') {
        ShowFormException(document.DohaHouseBillsFr.formexception.value, msgDictionary('createjourneyrequired'), 'ToAgent');
    }
    else {

        MCsetAttribute('actionservice /actioncontrol/@templateid', StateId);
        //LockupScreen('','MaqasaAttachmentsLsPg','LookUpMaqAttach',ProfileField('SetOffStatDeclarations.DeclarationId','text') + '=\''+HouseBillId+ '\'',700,400,true,false);
        LockupScreen('', 'SetOffStatDeclarationsPLsPg', 'LookUpSetOffStatDeclarations', ProfileField('SetOffStatDeclarations.DeclarationId', 'text') + '=\'' + sDeclarationId + '\'', 900, 400, true, false);

    }
}


//Script in List, id: declarationbill

//Script in List, id: DeclarationInvoice

//Script in List, id: DeclarationSpecificDuties

function GetDeclarationSpecificDuty(FrmName) {
    var BillType = MCgetAttribute("data/Declarationsrecords/Declarations/@BillType", '');
    GetSelectedNodesScreen(FrmName, 'ListDeclarationSpecificDuties', 'ListDeclarationSpecificDuty', BillType, 700, 400, true, false, 'DeclarationDuties', 'TempId', '', 'data.Declarationsrecords.Declarations.DeclarationDutiesrecords', Array('DutyId'));
}

function validateIDDDutycal() {
    var sStateId = MCgetAttribute('data/Declarationsrecords/IDDDetailsrecords/IDDDetails/@StateId', '');
    if ((sStateId != null && sStateId != '') && (sStateId == 'IDDDetailsCreatedState' || sStateId == 'IDDDetailsSubmittedState' || sStateId == 'IDDDetailsApprovedtate')) {
        alert(msgDictionary('IDD007'));
        return false;
    }
    else {
        return true;
    }
}


//Script in List, id: SadInvoiceAssociateDocuments

//Script in Form, id: itemdetails



function DrBrokerhiddenfieldsCCRequest() {
    //debugger;
    var sCanModifyDec = MCgetAttribute('data/Declarationsrecords/Declarations/@CanModifyDec', '');
    var sCCRequestId = MCgetAttribute('data/Declarationsrecords/Declarations/@CCRequestId', '');
    if (sCanModifyDec == '0' && sCCRequestId != '') {
        if (HtmlElementById('hscode') != null)
            HtmlElementById('hscode').disabled = true;

        if (HtmlElementById('HSCodeDescription') != null)
            HtmlElementById('HSCodeDescription').disabled = true;
        if (HtmlElementById('country') != null)
            HtmlElementById('country').disabled = true;
        if (HtmlElementById('Manufacturer') != null)
            HtmlElementById('Manufacturer').disabled = true;
        if (HtmlElementById('oldunitprice') != null)
            HtmlElementById('oldunitprice').disabled = true;
        if (HtmlElementById('totalprice') != null)
            HtmlElementById('totalprice').disabled = true;
        if (HtmlElementById('noofpackages') != null)
            HtmlElementById('noofpackages').disabled = true;

        if (HtmlElementById('txtpackagetype') != null)
            HtmlElementById('txtpackagetype').disabled = true;
        if (HtmlElementById('quantity') != null)
            HtmlElementById('quantity').disabled = true;
        if (HtmlElementById('weight') != null)
            HtmlElementById('weight').disabled = true;
        if (HtmlElementById('Gross1') != null)
            HtmlElementById('Gross1').disabled = true;
        if (HtmlElementById('IsRestricted') != null)
            HtmlElementById('IsRestricted').disabled = true;
        if (HtmlElementById('ExemptionDetails') != null)
            HtmlElementById('ExemptionDetails').disabled = true;

        if (HtmlElementById('IsExempted') != null)
            HtmlElementById('IsExempted').disabled = true;
        if (HtmlElementById('txtExemptionName') != null)
            HtmlElementById('txtExemptionName').disabled = true;
        if (HtmlElementById('txtExemptionBnf') != null)
            HtmlElementById('txtExemptionBnf').disabled = true;
        if (HtmlElementById('IncludeGCCDeposit') != null)
            HtmlElementById('IncludeGCCDeposit').disabled = true;
        if (HtmlElementById('volume') != null)
            HtmlElementById('volume').disabled = true;
        if (HtmlElementById('OtherReleases') != null)
            HtmlElementById('OtherReleases').disabled = true;
        // if(HtmlElementById('chkInfoIsCrct')!=null)
        // HtmlElementById('chkInfoIsCrct').disabled = true;
        if (HtmlElementById('IsRestricted') != null && HtmlElementById('IsRestricted').checked == false) {
            if (HtmlElementById('RelRef') != null)
                HtmlElementById('RelRef').style.display = 'none';
        }

        if (HtmlElementById('hscodebrowsebutton') != null)
            HtmlElementById('hscodebrowsebutton').style.display = 'none';
        if (HtmlElementById('countrybrowsebutton') != null) HtmlElementById('countrybrowsebutton').style.display = 'none';
        if (HtmlElementById('AddItemFromB2Form') != null) HtmlElementById('AddItemFromB2Form').style.display = 'none';

        if (HtmlElementById('btnPackageType') != null) HtmlElementById('btnPackageType').style.display = 'none';
        if (HtmlElementById('btnExemptionBnf') != null) HtmlElementById('btnExemptionBnf').style.display = 'none';
        if (HtmlElementById('cmdConvert') != null) HtmlElementById('cmdConvert').style.display = 'none';
        if (HtmlElementById('btnExemptionType') != null) HtmlElementById('btnExemptionType').style.display = 'none';

        if (HtmlElementById('btnExemptionBnf') != null)
            HtmlElementById('btnExemptionBnf').disabled = true;


        if (HtmlElementById('orderno') != null)
            HtmlElementById('orderno').disabled = true;
        if (HtmlElementById('orderdate') != null)
            HtmlElementById('orderdate').disabled = true;
        if (HtmlElementById('ExemptionRef') != null)
            HtmlElementById('ExemptionRef').disabled = true;
        disableListLink('DeclarationInvoice', 'NewItem');

    }
}




function ManageManufactureFieldForAntiDumping(SELF) {
    var frmObj = document.forms["itemdetails"];
    var SelManufature = $(SELF).val();
    var SelManufatureText = $(SELF).children(':selected').text();
    frmObj.hdAntiDumpingManufacturer.value = $(SELF).val();
    if (SelManufature != global_AntiDumpingManufacture_Other && SelManufature != global_AntiDumpingForPaperManufacture_Other && SelManufature != global_AntiDumpingManufactureIndia_Other) {
        if (SelManufature == "")
            $("#Manufacturer").val("");
        else
            $("#Manufacturer").val(SelManufatureText);

        $("#Manufacturer").attr("disabled", "disabled");
        $("#Manufacturer").attr("size", "55");
        MakeFieldOptional(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
    }
    else {
        $("#Manufacturer").val("");
        $("#Manufacturer").removeAttr("disabled");
        $("#Manufacturer").attr("size", "30");
        MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
    }
}

function ShowOrHideAntiDumpingFields(isOnload, ActionType) {
    AntiDumpingManufacturerDomineData();
    var frmObj = document.forms["itemdetails"];

    if ($("#CustomsBFormItemId").val() != "") {
        ActionType = "hide";
    }
    else
        if (ActionType == undefined) {
            /*var CommercialInvoiceId = $('#CommercialInvoiceId').val();
        
            var GrpRecords = xmlServiceDocument.selectNodes("servicedocument/data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices[@CommercialInvoiceId='"+CommercialInvoiceId+"']");
            var totalCount = GrpRecords.length;
            var CIContryOfOrigin = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices/@CountryOfOrigin','');
            if(totalCount == 1)
            CIContryOfOrigin = GrpRecords[0].getAttribute("CountryOfOrigin");*/

            ActionType = "hide"
            var CIICountryOfOrigin = $("#CountryOfOrigin").val();
            var TariffItemId = $("#TariffItemId").val();
            var CICountryOfOriginKoreaSouth = '';

            var CII = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@CommercialInvoiceId', '');
            for (var i = 0; i < MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/@TotalRecordsFetched', null); i++) {
                if (CII == MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices[' + i + ']/@CommercialInvoiceId', null)) {
                    CICountryOfOriginKoreaSouth = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices[' + i + ']/@CountryOfOrigin', null);
                }
            }

            var HBCountryOfOriginKoreaSouth = MCgetAttribute('data/Declarationsrecords/HouseBillsrecords/HouseBills/@CountryOfOrigin', '');


            var TariffItemId = $("#TariffItemId").val();
            var CIICountryOfOriginKoreaSouth = $("#CountryOfOrigin").val();
            if (global_AntiDumpingTariffItemId_KoreaSouth != undefined && global_AntiDumpingTariffItemId_KoreaSouth.indexOf(',' + TariffItemId + ',') > -1) {
                if (global_AntiDumpingCountry_KoreaSouth != undefined && (global_AntiDumpingCountry_KoreaSouth == CIICountryOfOrigin || global_AntiDumpingCountry_India == CIICountryOfOrigin || global_AntiDumpingCountry_Turkey == CIICountryOfOrigin)) {
                    CIICountryOfOriginKoreaSouth = $("#CountryOfOrigin").val();
                }
                else if (global_AntiDumpingCountry_KoreaSouth != undefined && (global_AntiDumpingCountry_KoreaSouth == CICountryOfOriginKoreaSouth || global_AntiDumpingCountry_India == CICountryOfOriginKoreaSouth || global_AntiDumpingCountry_Turkey == CICountryOfOriginKoreaSouth)) {
                    CIICountryOfOriginKoreaSouth = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices/@CountryOfOrigin', '');
                }
                else if (global_AntiDumpingCountry_KoreaSouth != undefined && (global_AntiDumpingCountry_KoreaSouth == HBCountryOfOriginKoreaSouth || global_AntiDumpingCountry_India == HBCountryOfOriginKoreaSouth || global_AntiDumpingCountry_Turkey == HBCountryOfOriginKoreaSouth)) {
                    CIICountryOfOriginKoreaSouth = MCgetAttribute('data/Declarationsrecords/HouseBillsrecords/HouseBills/@CountryOfOrigin', '');
                }
            }
            var CustomsControlProcedureId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
            var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');

            var DIRECT_RECEIVABLE_BILL_FOR_AIRPORT = GBL_CustomsControlProcedures.AIRPORT.IMPORT_BILL.DIRECT_RECEIVABLE_BILL_FOR_AIRPORT;
            var DIRECT_RECEIVABLE_BILL_FOR_SEAPORT = GBL_CustomsControlProcedures.SEAPORT.IMPORT_BILL.DIRECT_RECEIVABLE_BILL_FOR_SEAPORT;
            var DIRECT_RECEIVABLE_BILL_FOR_LANDPORT = GBL_CustomsControlProcedures.LANDPORT.IMPORT_BILL.DIRECT_RECEIVABLE_BILL_FOR_LANDPORT;

            if ((CIICountryOfOriginKoreaSouth == global_AntiDumpingCountry_KoreaSouth || CIICountryOfOriginKoreaSouth == global_AntiDumpingCountry_India || CIICountryOfOriginKoreaSouth == global_AntiDumpingCountry_Turkey) && (BillType == global_BillType.Import && CustomsControlProcedureId != DIRECT_RECEIVABLE_BILL_FOR_AIRPORT && CustomsControlProcedureId != DIRECT_RECEIVABLE_BILL_FOR_SEAPORT && CustomsControlProcedureId != DIRECT_RECEIVABLE_BILL_FOR_LANDPORT)) {
                if (global_AntiDumpingTariffItemId_KoreaSouth != undefined && global_AntiDumpingTariffItemId_KoreaSouth.indexOf(',' + TariffItemId + ',') > -1) {
                    ActionType = "show";
                }
            }
        }
    if (ActionType == "hide") {
        $("#BatterySize").val("");
        $("#hdAntiDumpingManufacturer").val("");
        MakeFieldOptional(frmObj, "BatterySize", HtmlElementById("BatterySize_Cell"));
        MakeFieldOptional(frmObj, "AntiDumpingManufacturer", HtmlElementById("AntiDumpingManufacturer_Cell"));

        if (!isOnload && $('#AntiDumpingDetailsRow').css('display') != 'none')

            $("#Manufacturer").removeAttr("disabled");
        $("#Manufacturer").attr("size", "30");
        MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
        $("#AntiDumpingDetailsRow").hide();
    }
    else {
        var SelManufature = $("#AntiDumpingManufacturer").val();
        if (SelManufature != global_AntiDumpingManufacture_Other || SelManufature != global_AntiDumpingManufactureIndia_Other) {
            if ((!isOnload && $('#AntiDumpingDetailsRow').css('display') == 'none') || (isOnload && $('#AntiDumpingManufacturer').val() == ""))
                $("#Manufacturer").val("");

            $("#Manufacturer").attr("disabled", "disabled");
            $("#Manufacturer").attr("size", "55");
            MakeFieldOptional(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
        }
        else {
            $("#Manufacturer").removeAttr("disabled");
            $("#Manufacturer").attr("size", "30");
            MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
        }

        MakeFieldRequired(frmObj, "BatterySize", HtmlElementById("BatterySize_Cell"));
        MakeFieldRequired(frmObj, "AntiDumpingManufacturer", HtmlElementById("AntiDumpingManufacturer_Cell"));
        $("#AntiDumpingDetailsRow").show();
        if (CIICountryOfOriginKoreaSouth == global_AntiDumpingCountry_Turkey || CICountryOfOriginKoreaSouth == global_AntiDumpingCountry_Turkey) {
            MakeFieldOptional(frmObj, "AntiDumpingManufacturer", HtmlElementById("AntiDumpingManufacturer_Cell"));
            $("#AntiDumpingManufacturer_lbl_Cell,#AntiDumpingManufacturer_Cell").hide();
            $("#hdAntiDumpingManufacturer").val("");
            $("#Manufacturer").removeAttr("disabled");
        }
        else if (CIICountryOfOriginKoreaSouth == global_AntiDumpingCountry_India || CICountryOfOriginKoreaSouth == global_AntiDumpingCountry_India) {
            MakeFieldRequired(frmObj, "AntiDumpingManufacturer", HtmlElementById("AntiDumpingManufacturer_Cell"));
            $("#AntiDumpingManufacturer_lbl_Cell,#AntiDumpingManufacturer_Cell").show();
            $("#Manufacturer").attr("disabled", "disabled");
        }


    }
}
function SetValueIncludeGCCDeposit() {
    if (HtmlElementById('IncludeGCCDeposit') != null) {
        if (HtmlElementById('IncludeGCCDeposit').checked) {
            HtmlElementById('IncludeGCCDeposit').value = 1;
        }
        else {
            HtmlElementById('IncludeGCCDeposit').value = 0;
        }
    }
}



function EnableGCCDeposit() {
    var sCountryOfOrigin = HtmlElementById('CountryOfOrigin').value;
    var sIsExempted = HtmlElementById('IsExempted').checked;
    var sExemptionFor = HtmlElementById('txtExemptionId').value;
    var IncludeGCCDeposite = MCgetAttribute('actionservice/actioncontrol/@IncludeGccDeposite', '');

    var flag = 0;
    var sIncludeGCCDeposit = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@IncludeGCCDeposit', '');
    if (sIncludeGCCDeposit == '1')
        HtmlElementById('IncludeGCCDeposit').checked = true;



    if (sCountryOfOrigin != '' && sIsExempted && sExemptionFor == global_GCCCountry.GCC && IncludeGCCDeposite == 'true') {
        if (sCountryOfOrigin == global_GCCCountries.Bahrain || sCountryOfOrigin == global_GCCCountries.SultanateOfOman || sCountryOfOrigin == global_GCCCountries.Qatar || sCountryOfOrigin == global_GCCCountries.SaudiArabia || sCountryOfOrigin == global_GCCCountries.UnitedArabEmirates || sCountryOfOrigin == global_GCCCountries.Kuwait) {
            if (HtmlElementById('IncludeGCCDeposit') != null)
                HtmlElementById('IncludeGCCDeposit').disabled = false;
            flag = 1;
        }
    }

    if (flag == 0) {
        if (HtmlElementById('IncludeGCCDeposit') != null) {
            HtmlElementById('IncludeGCCDeposit').disabled = true;
            HtmlElementById('IncludeGCCDeposit').checked = false;
        }
    }
}


function ValidateNetAndGrossWeight(frmObj) {
    var nWeight = frmObj.weight.value;
    var gWeight = frmObj.Gross1.value
    if (frmObj.weight.value != null) {
        if (frmObj.weight.value != '') {
            if (parseFloat(nWeight) > parseFloat(gWeight)) {
                ShowFormException(frmObj.formexception.value, msgDictionary('errNtWgt001'), 'weight');
                return false;
            }
        }
    }
    return true;
}



function DisableEnableBForm() {
    if (HtmlElementById('AddItemFromB2Form') != null)
        HtmlElementById('AddItemFromB2Form').style.display = 'none';
    if (HtmlElementById('UnbindB2Form') != null)
        HtmlElementById('UnbindB2Form').style.display = '';
    ShowOrHideAntiDumpingFields(false, "hide");
    ShowOrHideAntiDumpingFields_latest(false);
    ShowOrHideCeramicProductManufacturers();
}
function UnBindB2Form() {
    if (HtmlElementById('hscode') != null)
        HtmlElementById('hscode').disabled = false;
    if (HtmlElementById('hscodebrowsebutton') != null)
        HtmlElementById('hscodebrowsebutton').disabled = false;
    if (HtmlElementById('btnOrgCode') != null)
        HtmlElementById('btnOrgCode').disabled = false;
    if (HtmlElementById('description') != null)
        HtmlElementById('description').disabled = false;
    if (HtmlElementById('country') != null)
        HtmlElementById('country').disabled = false;
    if (HtmlElementById('countrybrowsebutton') != null)
        HtmlElementById('countrybrowsebutton').disabled = false;
    if (HtmlElementById('totalprice') != null)
        HtmlElementById('totalprice').disabled = false;
    // if(HtmlElementById('txtpackagetype')!=null)
    //	  HtmlElementById('txtpackagetype').disabled = false;
    // if(HtmlElementById('btnPackageType')!=null)
    //	  HtmlElementById('btnPackageType').disabled = false;
    if (HtmlElementById('quantity') != null)
        HtmlElementById('quantity').disabled = false;
    if (HtmlElementById('cmdConvert') != null)
        HtmlElementById('cmdConvert').disabled = false;
    if (HtmlElementById('weight') != null)
        HtmlElementById('weight').disabled = false;
    if (HtmlElementById('Gross1') != null)
        HtmlElementById('Gross1').disabled = false;
    if (HtmlElementById('IsExempted') != null)
        HtmlElementById('IsExempted').disabled = false;
    if (HtmlElementById('txtExemptionName') != null)
        HtmlElementById('txtExemptionName').disabled = false;
    if (HtmlElementById('btnExemptionType') != null)
        HtmlElementById('btnExemptionType').disabled = false;
    if (HtmlElementById('txtExemptionBnf') != null)
        HtmlElementById('txtExemptionBnf').disabled = false;
    if (HtmlElementById('btnExemptionBnf') != null)
        HtmlElementById('btnExemptionBnf').disabled = false;
    if (HtmlElementById('ExemptionRef') != null)
        HtmlElementById('ExemptionRef').disabled = false;
    if (HtmlElementById('txtExemptionId') != null)
        HtmlElementById('txtExemptionId').disabled = false;
    HtmlElementById('txtExemptionName').value = "";
    HtmlElementById('CustomsBFormItemId').value = "";
    HtmlElementById('txtExemptionId').value = "";
    HtmlElementById('txtExemptionBnf').value = "";
    HtmlElementById('txtExemptionBnfId').value = "";
    HtmlElementById('ExemptionRef').value = "";
    HtmlElementById('ExemptionDetails').value = "";
    HtmlElementById('IsExempted').disabled = false;
    EnableDiableExcemptionFor('itemdetails');
    if (HtmlElementById('AddItemFromB2Form') != null)
        HtmlElementById('AddItemFromB2Form').style.display = '';
    if (HtmlElementById('UnbindB2Form') != null)
        HtmlElementById('UnbindB2Form').style.display = 'none';
    ShowOrHideAntiDumpingFields(false);
    ShowOrHideAntiDumpingFields_latest(false);
    ShowOrHideCeramicProductManufacturers();
}

function disableExemption(frmName) {
    if (global_BForm.EnableExemption == 'false') {
        if (HtmlElementById('AddItemFromB2Form') != null)
            HtmlElementById('AddItemFromB2Form').style.display = 'none';
        if (HtmlElementById('UnbindB2Form') != null)
            HtmlElementById('UnbindB2Form').style.display = 'none';
    }
    else {

        var frm = document.forms[frmName];
        var sERequestedItemId = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@CustomsBFormItemId', '')
        if (sERequestedItemId != '' && frm.name == 'itemdetails') {
            if (HtmlElementById('AddItemFromB2Form') != null)
                HtmlElementById('AddItemFromB2Form').style.display = 'none';
            if (HtmlElementById('hscode') != null)
                HtmlElementById('hscode').disabled = true;
            if (HtmlElementById('description') != null)
                HtmlElementById('description').disabled = true;

            if (HtmlElementById('hscodebrowsebutton') != null)
                HtmlElementById('hscodebrowsebutton').disabled = true;
            if (HtmlElementById('btnOrgCode') != null)
                HtmlElementById('btnOrgCode').disabled = true;
            if (HtmlElementById('country') != null)
                HtmlElementById('country').disabled = true;
            if (HtmlElementById('countrybrowsebutton') != null)
                HtmlElementById('countrybrowsebutton').disabled = true;
            if (HtmlElementById('totalprice') != null)
                HtmlElementById('totalprice').disabled = true;
            //   if(HtmlElementById('txtpackagetype')!=null)
            // 	  HtmlElementById('txtpackagetype').disabled = true;
            //    if(HtmlElementById('btnPackageType')!=null)
            //  	  HtmlElementById('btnPackageType').disabled = true;
            if (HtmlElementById('quantity') != null)
                HtmlElementById('quantity').disabled = true;
            if (HtmlElementById('cmdConvert') != null)
                HtmlElementById('cmdConvert').disabled = true;
            if (HtmlElementById('weight') != null)
                HtmlElementById('weight').disabled = true;
            if (HtmlElementById('IsExempted') != null)
                HtmlElementById('IsExempted').disabled = true;
            if (HtmlElementById('txtExemptionName') != null)
                HtmlElementById('txtExemptionName').disabled = true;
            if (HtmlElementById('btnExemptionType') != null)
                HtmlElementById('btnExemptionType').disabled = true;
            if (HtmlElementById('txtExemptionBnf') != null)
                HtmlElementById('txtExemptionBnf').disabled = true;
            if (HtmlElementById('btnExemptionBnf') != null)
                HtmlElementById('btnExemptionBnf').disabled = true;
            if (HtmlElementById('ExemptionRef') != null)
                HtmlElementById('ExemptionRef').disabled = true;
            if (HtmlElementById('txtExemptionId') != null)
                HtmlElementById('txtExemptionId').disabled = true;
        }
        else
            if (HtmlElementById('UnbindB2Form') != null)
                HtmlElementById('UnbindB2Form').style.display = 'none';
    }
}


function AssociateHBItems(frm) {
    var sReferenceDeclId = "";
    var sCommercialInvoiceItemId = "";
    var sRefCINVItemId = "";

    if (MCgetAttribute('data/Declarationsrecords/Declarations/@RefDeclarationId', '') != '')
        sReferenceDeclId = MCgetAttribute('data/Declarationsrecords/Declarations/@RefDeclarationId', '');
    else if ((HtmlElementById('RefDeclarationId') != null) && (typeof (HtmlElementById('RefDeclarationId'))) != 'undefined' && HtmlElementById('RefDeclarationId') != '')
        sReferenceDeclId = HtmlElementById('RefDeclarationId').value;

    var sHouseBillId = "";
    if (HtmlElementById('HouseBillId') != null)
        sHouseBillId = HtmlElementById('HouseBillId').value;

    if (MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@RefItemId', '') != '')
        sRefCINVItemId = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@RefItemId', '')
    if (MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@CommercialInvoiceItemId', '') != '')
        sCommercialInvoiceItemId = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@CommercialInvoiceItemId', '');
    LockupScreen('', 'DeclaredHBItemsAssociatedFrPg', 'ListAssociatedDeclHBItems', sCommercialInvoiceItemId + '~' + MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationId', '') + '~' + sReferenceDeclId + '~' + sHouseBillId + '~' + MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@Quantity', '') + '~' + MCgetAttribute('data/Declarationsrecords/Declarations/@StateId', '') + '~' + sRefCINVItemId, 800, 600, true, false);
    return false;
}


function SilentCallCheckPriceVariation(frm) {

    if (ValidateForm(frm)) {

        var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
        var objBaseForm = document.forms["itemdetails"];

        //added by mahesh start for AntiDumping cuttoffdate

        var year = dServerDate.getYear()
        var Month = dServerDate.getMonth() + 1
        var date = dServerDate.getDate()
        if ((dServerDate.getMonth() + 1) < 10)
            Month = '0' + Month;
        if (dServerDate.getDate() < 10)
            date = '0' + date;
        var sCurrentDate = year + '-' + Month + '-' + date


        var sSelectedManufacturer = objBaseForm.hdAntiDumpingManufacturer.value;
        var sDecDateCreated = MCgetAttribute('data/Declarationsrecords/Declarations/@DecDateCreated', '');
        var sDeclNo = MCgetAttribute('data/Declarationsrecords/Declarations/@DeclarationNumber', '');
        var sCountryOfOriginCode = $('#CountryOfOrigin').val();

        if (global_HankookAtlasBXAntiDumpDutyCutoffDate < sCurrentDate) {
            if (global_AntiDumpingCountry_KoreaSouth == sCountryOfOriginCode && global_AntiDumpingRistrictAtlasCompany == sSelectedManufacturer && sDeclNo == "") {
                alert(msgDictionary('errAuntiDumpingManufacturerNoMore'));
                return false;
            }
        }
        //added by mahesh end


        // if(sCCPId != global_CustomsControlProcedures.CONSIGNMENT_TRACKING_FORM_FOR_LANDPORT)
        {

            if (objBaseForm.chkInfoIsCrct != null) { var sChecked = objBaseForm.chkInfoIsCrct.checked; }

            if (!sChecked) {
                alert(msgDictionary('errAcceptManufacturer'));
                return false;
            }

            //added by Prashanth to check Correctness of Manufacturer

            if (!ValidateManufacturer(HtmlElementById('Manufacturer').value) && MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@RefItemId', '') == '') {
                var sCCRequestId = MCgetAttribute('data/Declarationsrecords/Declarations/@CCRequestId', '');
                if (sCCRequestId == '') {
                    alert(msgDictionary('errValidManufacturer'));
                    return false;
                }
            }
        }


        //added by krao for OGD Process
        if (HtmlElementById('hdOGDRelRef').value != null && GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE') {
            HtmlElementById('RestrictionRelRef').value = HtmlElementById('hdOGDRelRef').value;
        }



        if (global_BForm.EnableExemption == 'true' && (sCCPId == GBL_CustomsControlProcedures.AIRPORT.IMPORT_BILL.IMPORT || sCCPId == GBL_CustomsControlProcedures.LANDPORT.IMPORT_BILL.IMPORT || sCCPId == GBL_CustomsControlProcedures.SEAPORT.IMPORT_BILL.IMPORT || sCCPId == GBL_CustomsControlProcedures.FREEZONE.IMPORT_BILL.IMPORTFREEZONE)) {
            if (HtmlElementById('txtExemptionBnfId') != null && HtmlElementById('txtExemptionId') != null && HtmlElementById('IsExempted') != null && objBaseForm.IsExempted.checked == 1) {
                var sDODate = MCgetAttribute('data/Declarationsrecords/DeliveryOrdersrecords/DeliveryOrders/@DeliveryOrderDate', '');
                var sDate = sDODate.split('T')[0];
                var date1 = sDate.split('-');
                sDODate = date1[2] + '-' + date1[1] + '-' + date1[0];
                var sBFormCutOffDate = global_BForm.CutOffDate;
                var sExemptionBNFTypeId = HtmlElementById('txtExemptionBnfId').value;
                var sCustomsBFormItemId = HtmlElementById('CustomsBFormItemId').value;
                var sExemptionForTypeId = HtmlElementById('txtExemptionId').value;
                if (bCompareDate(sDODate, '>=', sBFormCutOffDate) && sExemptionBNFTypeId == global_BForm.Exemption_Beneficiary
                    && sExemptionForTypeId == global_BForm.Exemption_For && (sCustomsBFormItemId == null || sCustomsBFormItemId == '')) {
                    alert(msgDictionary('errCIIBForm'));
                    return false;
                }
                else if (HtmlElementById('CustomsBFormItemId').value == '' && bCompareDate(sDODate, '>=', global_BForm.CutOffDate_KDIPA) && sExemptionBNFTypeId == global_BForm.Exemption_Beneficiary_KDIPA && sExemptionForTypeId == global_BForm.Exemption_For) {
                    alert(msgDictionary('errCIIBForm'));
                    return false;
                }



            }
        }



        MCsetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@TariffItemId', objBaseForm.TariffItemId.value);
        MCsetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@QtyType', objBaseForm.hdQtyType.value);
        MCsetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@CountryOfOrigin', objBaseForm.CountryOfOrigin.value);
        MCsetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@UnitPrice', objBaseForm.unitprice.value);
        ClearErrorMsg(objBaseForm.formexception.value);
        var strXml = xmlServiceDocument.selectSingleNode(rootNodeName + "/" + dataNodeName + "/CommercialInvoiceItemsrecords");
        strXml = OuterXML(strXml)

        // var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId','');

        if (sCCPId == global_CustomsControlProcedures.EXPORT_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.EXPORT_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.EXPORT_BILL_FOR_LANDPORT || sCCPId == global_CustomsControlProcedures.EXPORT_BILL_FOR_FREEZONE
            || sCCPId == global_CustomsControlProcedures.IMPORT_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.IMPORT_BILL_FOR_SEAPORT_EXEMPTED || sCCPId == global_CustomsControlProcedures.IMPORT_BILL_FOR_LANDPORT_EXEMPTED || sCCPId == global_CustomsControlProcedures.IMPORT_BILL_FOR_FREEZONE)
        //Comment And Modified by Jones - 03-June-2011 - Ends
        {
            //					var myReq = new SilentActionCall('ValidatePriceValuationNew','',CheckPriceVariationCallBack,strXml,rootNodeName+'/'+dataNodeName+'/','ItemPricerecords');
            var myReq = new SilentActionCall('ValidatePriceValuationNew', '', CheckPriceVariationCallBack, strXml, rootNodeName + '/' + dataNodeName + '/', 'CommercialInvoiceItemsrecords');
            myReq.StartRequest();
            myReq = null;
        }
        else {
            //Price Variation Doesenot Exists
            var getTemplateid = getParameter('templateid', null)
            if (getTemplateid == 'new') {
                checkDiscountValue(objBaseForm, 'SaveNewCommercialInvoiceItemOne', 'OpenDeclaration', ProfileField('Declarations.DeclarationId', 'text') + '=\'' + objBaseForm.DeclarationId.value + '\'', 'SAD', '0');
            }
            else if (getTemplateid == 'saveandnew') {
                checkDiscountValue(objBaseForm, 'SaveNewCommercialInvoiceItemOne', 'NewCommercialInvoiceItemOneForSaveAndAdd', ProfileField('CommercialInvoices.CommercialInvoiceId', 'text') + '=\'' + objBaseForm.CommercialInvoiceId.value + '\'', 'CommercialInvoiceItem', '1');
            }
            else if (getTemplateid == 'save') {
                validateQty();
            }

        }



    }
}


function CheckPriceVariationCallBack(rtnRows) {
    var objBaseForm = document.forms["itemdetails"];
    var sCommInvoiceId = objBaseForm.CommercialInvoiceId.value;
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    //Comment And Modified by Jones - 03-June-2011 - Begin
    //As per Request We Include Only Import and Export Bill Types
    /*
    if ( rtnRows.length  > 0  && (sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT && sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT && sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT && sCCPId != global_CustomsControlProcedures.GENERAL_TRANSIT_BILL_FOR_AIRPORT && sCCPId != global_CustomsControlProcedures.GENERAL_TRANSIT_BILL_FOR_LANDPORT && sCCPId != global_CustomsControlProcedures.TRANSIT_BILL_FOR_LANDPORT && sCCPId != global_CustomsControlProcedures.GENERAL_TRANSIT_BILL_FOR_SEAPORT && sCCPId != global_CustomsControlProcedures.TRANSIT_BILL_FOR_SEAPORT
                && sCCPId != global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_AIRPORT_WITH_DO && sCCPId != global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_SEAPORT_WITH_DO && sCCPId != global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_LANDPORT_WITH_DO && sCCPId != global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_AIRPORT && sCCPId != global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_SEAPORT && sCCPId != global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_LANDPORT
                && sCCPId != global_CustomsControlProcedures.EXPORT_BILL_FOR_AIRPORT && sCCPId != global_CustomsControlProcedures.EXPORT_BILL_FOR_SEAPORT && sCCPId != global_CustomsControlProcedures.EXPORT_BILL_FOR_LANDPORT && sCCPId != global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_AIRPORT_WITHOUT_DO && sCCPId != global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_SEAPORT_WITHOUT_DO && sCCPId != global_CustomsControlProcedures.LANDED_BY_MISTAKE_FOR_LANDPORT_WITHOUT_DO))//Added By Jones - 01-June-2011 to Restrict Temp Import and Landed by Mistake(wit DO) CCPs
                */
    if (rtnRows.length > 0) {
        var isAbnormal = rtnRows[0].selectSingleNode("//CommercialInvoiceItems/@IsPriceAbnormal").nodeValue

        if ((isAbnormal == '1') && (sCCPId == global_CustomsControlProcedures.EXPORT_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.EXPORT_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.EXPORT_BILL_FOR_LANDPORT || sCCPId == global_CustomsControlProcedures.EXPORT_BILL_FOR_FREEZONE
            || sCCPId == global_CustomsControlProcedures.IMPORT_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.IMPORT_BILL_FOR_SEAPORT_EXEMPTED || sCCPId == global_CustomsControlProcedures.IMPORT_BILL_FOR_LANDPORT_EXEMPTED || sCCPId == global_CustomsControlProcedures.IMPORT_BILL_FOR_FREEZONE))
        //Comment And Modified by Jones - 03-June-2011 - Ends
        {
            //Price Variation Exists
            MCsetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@IsPriceAbnormal', "true");
            MCsetAttribute('data/Declarationsrecords/Declarations/@PriceAlertMsg', msgDictionary('PriceAlertMsg'));
            LockupScreen('ExportBill', 'VerifyPriceVarFrPg', '', '', 700, 400, true, false);
            //LockupScreen('','VerifyPriceVarFrPg','OpenCommercialInvoiceOne',ProfileField('CommercialInvoices.CommercialInvoiceId','text') + '=N\''+sCommInvoiceId+ '\'',700,400,true,false);
        }
        else {
            //Price Variation Doesenot Exists
            MCsetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@IsPriceAbnormal', "false");
            MCsetAttribute('data/Declarationsrecords/Declarations/@PriceAlertMsg', '');
            var getTemplateid = getParameter('templateid', null)
            if (getTemplateid == 'new') {
                checkDiscountValue(objBaseForm, 'SaveNewCommercialInvoiceItemOne', 'OpenDeclaration', ProfileField('Declarations.DeclarationId', 'text') + '=\'' + objBaseForm.DeclarationId.value + '\'', 'SAD', '0');
            }
            else if (getTemplateid == 'saveandnew') {
                checkDiscountValue(objBaseForm, 'SaveNewCommercialInvoiceItemOne', 'NewCommercialInvoiceItemOneForSaveAndAdd', ProfileField('CommercialInvoices.CommercialInvoiceId', 'text') + '=\'' + objBaseForm.CommercialInvoiceId.value + '\'', 'CommercialInvoiceItem', '1');
            }
            else if (getTemplateid == 'save') {
                validateQty();
            }

        }
    }
}
function fnCloneSubmit() {
    var objBaseForm = document.forms["itemdetails"];
    var sCommInvoiceId = objBaseForm.CommercialInvoiceId.value;

    var getTemplateid = getParameter('templateid', null)
    if (getTemplateid == 'new') {
        checkDiscountValue(objBaseForm, 'SaveNewCommercialInvoiceItemOne', 'OpenDeclaration', ProfileField('Declarations.DeclarationId', 'text') + '=\'' + objBaseForm.DeclarationId.value + '\'', 'SAD', '0');
    }
    else if (getTemplateid == 'saveandnew') {
        checkDiscountValue(objBaseForm, 'SaveNewCommercialInvoiceItemOne', 'NewCommercialInvoiceItemOneForSaveAndAdd', ProfileField('CommercialInvoices.CommercialInvoiceId', 'text') + '=\'' + objBaseForm.CommercialInvoiceId.value + '\'', 'CommercialInvoiceItem', '1');
    }
    else if (getTemplateid == 'save') {
        validateQty();
    }

    //pageSubmit(null,false);	
}

function Cancel() {
    if (getParameter('previouspageid', '') == 'InspectionRequest') {
        ThisWindowObj().close();
    }
    else {
        var pageid = getParameter('pageid');
        if (pageid == 'CommercialInvoiceItem')
            setParameterList(global_arrRegParameters, Array('', 'OpenCommercialInvoiceOne', ProfileField('CommercialInvoices.CommercialInvoiceId', 'text') + '=N\'' + HtmlElementById('CommercialInvoiceId').value + '\'', '', '', 'CommercialInvoice', ''));
        else
            setParameterList(global_arrRegParameters, Array('', 'OpenCommercialInvoiceOne', ProfileField('CommercialInvoices.CommercialInvoiceId', 'text') + '=N\'' + HtmlElementById('CommercialInvoiceId').value + '\'', '', '', 'TransitCommercialInvoice', ''));
        pageSubmit(null, true);
    }
}
function toFloat(value) {
    return (isNaN(parseFloat(value)) ? 0.0 : parseFloat(value));
}
function TotalPrice() {
    var frm = document.itemdetails;
    var unitPrice = 0;

    if (EUSite == 'yes')
        var qty = toFloat(frm.quantity1.value);
    else
        var qty = toFloat(frm.quantity.value);

    /*				var iN = 0;
                    if(EUSite == 'yes')
                        iN = Number (toFloat(frm.unitprice.value) * toFloat(frm.quantity1.value) );
                    else
                        iN = Number (toFloat(frm.unitprice.value) * toFloat(frm.quantity.value) );
                    var totalPrice = roundF(iN,3)  ;					
    */
    // Modified by Gopinath Mani for the Change of flow
    //For Import Bayan From Temp.Import
    var sRefDecId = MCgetAttribute('data/Declarationsrecords/Declarations/@RefDeclarationId', '');
    if (sRefDecId != '') {
        if (qty > 0)
            unitPrice = toFloat(frm.unitprice.value) * qty;
        frm.totalprice.value = unitPrice.toFixed(3);
    }
    else {
        if (qty > 0)
            unitPrice = toFloat(frm.totalprice.value) / qty;
        frm.unitprice.value = unitPrice.toFixed(3);
    }

    //var nDiscountValue = Number(frm.Discount.value);
    //dev_debug( roundF(unitPrice,3) + ' * ' + unitPrice.toFixed(3) ); By Gopinath Mani
    //frm.unitprice.value =roundF(unitPrice,3);	


}
function checkDiscountValue(frm, actionid, nextactionid, nextactioncriteria, nextpageid, nextcontinue) {
    if (ValidateForm(frm)) {
        if (getParameter('pageid', '') == 'TransitCommercialInvoiceItem') {
            if (nextactionid == 'NewCommercialInvoiceItemOneForSaveAndAdd')
                nextpageid = 'TransitCommercialInvoiceItem';
            else
                nextpageid = 'TransitBillSAD';
        }

        if (frm.hscode.value == '' && (EUSite != 'yes')) {
            ShowFormException(frm.formexception.value, msgDictionary('hscoderequired'), 'hscode');
        } else if (frm.tariccode.value == '' && EUSite == 'yes') {
            ShowFormException(frm.formexception.value, msgDictionary('tariccoderequired'), 'tariccode');
        } else if (frm.quantity.value == '' && EUSite != 'yes') {
            ShowFormException(frm.formexception.value, msgDictionary('errmsgqtytaric'), 'quantity');
        } else if (frm.quantity1.value == '' && EUSite == 'yes') {
            ShowFormException(frm.formexception.value, msgDictionary('errmsgqtytaric'), 'quantity1');
        } else if (frm.totalprice.value == '') {
            ShowFormException(frm.formexception.value, msgDictionary('errTotalPriceRequired'), 'totalprice');
        } else if (frm.totalprice.value == 0) {
            ShowFormException(frm.formexception.value, msgDictionary('yearformaterrornotzero'), 'totalprice');
        } else if (frm.quantity.value == 0) {
            ShowFormException(frm.formexception.value, msgDictionary('yearformaterrornotzero'), 'quantity');
        } else if (frm.weight.value == 0) {
            ShowFormException(frm.formexception.value, msgDictionary('yearformaterrornotzero'), 'weight');
        }
        /*else if (frm.noofpackages.value == 0){
                    ShowFormException(frm.formexception.value,msgDictionary('yearformaterrornotzero'),'noofpackages');                                                                                  
        }*/
        else if (frm.Gross1.value == 0) {
            ShowFormException(frm.formexception.value, msgDictionary('yearformaterrornotzero'), 'Gross1');
        } else if (ToNumber(frm.weight.value, 0) > ToNumber(frm.Gross1.value, 0) && frm.Gross1.value != '') {
            ShowFormException(frm.formexception.value, msgDictionary('errNtWgt'), 'weight');
        } else if (frm.IsExempted.checked == 1) {
            if (frm.txtExemptionName != null) {
                if (frm.txtExemptionName.value == '') {
                    ShowFormException(frm.formexception.value, msgDictionary('errExcemptionFor'), 'IsExempted');
                }
                else {
                    // setParameterList(global_arrRegParameters, Array('',actionid, '','OpenCommercialInvoice',ProfileField('CommercialInvoices.CommercialInvoiceId','text') + '=N\''+frm.CommercialInvoiceId.value+ '\'','CommercialInvoiceFromList',''));
                    // Being Modified by Gopinath Mani for redirecting the page based on different flows.
                    setParameterList(global_arrRegParameters, Array('', actionid, '', nextactionid, nextactioncriteria, nextpageid, nextcontinue));

                    pageSubmit(frm, false);
                }
            }
        }
        else {
            //TotalPrice();
            setParameterList(global_arrRegParameters, Array('', actionid, '', nextactionid, nextactioncriteria, nextpageid, nextcontinue));
            pageSubmit(frm, false);
        }
    }
}


function resetCountry() {
    //reset values, related to Country.
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.CountryOfOrigin.value = "";
    objBaseForm.country.value = "";
    objBaseForm.CountryOfOriginCode.value = "";
    ShowOrHideCeramicProductManufacturers();
}
function updateCountry(xmlObjTemp) {
    //update the values, related to Country.     
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.CountryOfOrigin.value = xmlObjTemp.getAttributeNode("LocationId").nodeValue;
    objBaseForm.country.value = xmlObjTemp.getAttributeNode("Name").nodeValue;
    objBaseForm.CountryOfOriginCode.value = xmlObjTemp.getAttributeNode("UNCode").nodeValue;
    ClearErrorMsg(objBaseForm.formexception.value);
}
function resetHSCode() {
    //reset values, related to HSCode.
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.TariffItemId.value = "";
    objBaseForm.hscode.value = "";
    objBaseForm.HSCodeDescription.value = "";
    if (HtmlElementById('description').disabled != false)
        objBaseForm.description.value = "";
    objBaseForm.hdQtyType.value = "";
    objBaseForm.txtqtytype.value = "";
}
function resetTaricCode() {
    //reset values, related to HSCode.
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.TaricSubheadingId.value = "";
    objBaseForm.tariccode.value = "";
    objBaseForm.TaricDescription.value = "";
}
function updateHSCode(xmlObjTemp) {
    //update the values, related to HSCode.   
    var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');
    var phase = MCgetAttribute('data/Declarationsrecords/CustomsControlProceduresrecords/CustomsControlProcedures/@Phase', '');

    var objBaseForm = document.forms["itemdetails"];
    var xmlTariffItemNode = xmlObjTemp.selectSingleNode('//Search/HSCodeForDeclarationrecords/HSCodeForDeclaration');
    var xmlMeasurementNode = xmlObjTemp.selectSingleNode('//Search/HSCodeForDeclarationrecords/MeasurementUnitsrecords/MeasurementUnits');
    if (xmlTariffItemNode != null && xmlObjTemp.selectSingleNode('//Search/HSCodeForDeclarationrecords').childNodes.length < 3) {
        objBaseForm.TariffItemId.value = xmlTariffItemNode.getAttributeNode("TariffItemId").nodeValue;
        objBaseForm.hscode.value = xmlTariffItemNode.getAttributeNode("Code").nodeValue;
        objBaseForm.HSCodeDescription.value = xmlTariffItemNode.getAttributeNode("Description").nodeValue;
        //Start - Code Added By MohanKumar on 14-Oct-2013 - Broker can edit the Invoice Item Goods Description of all Bayan Types(Except DR Bayan)
        var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
        var isDRAuditor = IsRoleExist("DirectReleaseAuditor");
        var isClearingAgent = IsRoleExist("ClearingAgent");

        //added by sthanikella to enable editing of goods desc for Dr Bayans 7-jan-2015
        var isDRBroker = IsRoleExist("DR Broker");

        if (objBaseForm.TariffItemId != null && objBaseForm.TariffItemId != '' && (isDRAuditor == true || isDRBroker == true) && ((sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT))) {
            if (HtmlElementById('description') != null) HtmlElementById('description').disabled = false;
            objBaseForm.description.value = '';
        }
        else if ((sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT && sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT && sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT) && (isClearingAgent == true || IsRoleExist("BWHClearingAgent,"))) {
            if (HtmlElementById('description') != null) {
                HtmlElementById('description').disabled = false;
                //objBaseForm.description.value = "";
            }
        }
        else {
            if (HtmlElementById('description') != null) {
                HtmlElementById('description').disabled = true;

                //Comment And Modified by Jones - For Auto Fetch Short Desc From Tariff Item - 20-June-2011
                //objBaseForm.description.value = xmlTariffItemNode.getAttributeNode("LocalDescription").nodeValue;
                objBaseForm.description.value = xmlTariffItemNode.getAttributeNode("ShortDescription").nodeValue;
            }
        }
        //End - Code Added By MohanKumar on 14-Oct-2013 - Broker can edit the Invoice Item Goods Description of all Bayan Types(Except DR Bayan)

        if (xmlMeasurementNode != null) {
            objBaseForm.hdQtyType.value = xmlMeasurementNode.getAttributeNode("MeasurementUnitId").nodeValue;
            objBaseForm.txtqtytype.value = xmlMeasurementNode.getAttributeNode("Description").nodeValue;
        }
        if (phase == '3') {
            EnableDiableCustomRestriction('itemdetails');

            // For setting the Org Code in the base form...
            var codes = '';
            if (BillType == global_BillType.Import || BillType == global_BillType.Transit) {
                codes = xmlTariffItemNode.getAttributeNode("TempImpCode").nodeValue;
                if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {
                    if (sCCPId == global_CustomsControlProcedures.CONSIGNMENT_TRACKING_FORM_FOR_LANDPORT) {
                        if (objBaseForm.btnOrgCode != null) objBaseForm.btnOrgCode.style.display = 'none';
                        if (objBaseForm.RelRef != null) objBaseForm.RelRef.disabled = true;
                        return false;
                    }

                    // HtmlElementById('RestrictionRelRef').style.display ='none';

                    if (HtmlElementById('btnOrgCode') != null) HtmlElementById('btnOrgCode').style.display = '';
                    if (HtmlElementById('btnOrgCode') != null) HtmlElementById('btnOrgCode').value = codes;
                    if (phase == '3') {
                        HtmlElementById('txtRestrictionName').value = codes;
                        HtmlElementById('txtRestrictionId').value = codes;
                    }
                    else if (phase == '2') {
                        codes = MCgetAttribute('data/CommercialInvoiceItemsrecords/CustomsRestrictionTyperecords/CustomsRestrictionType/@Name', '');
                        HtmlElementById('txtRestrictionName').value = codes;
                    }

                    HtmlElementById('RestrictionRelRef').disabled = false;
                    //MakeFieldRequired(objBaseForm,"RestrictionRelRef",HtmlElementById("cellRestrictionRelRef"));
                    if (xmlTariffItemNode.getAttributeNode("ImpRes").nodeValue.indexOf("P") != -1) {
                        HtmlElementById('IsRestricted').checked = false;
                        HtmlElementById('IsRestricted').value = 0;
                        HtmlElementById('btnOrgCode').className = 'resprobutton-pro';
                        //Open Restriction detail PopUp by default for Restricted item
                        var TariffItemId = HtmlElementById('TariffItemId').value;
                        if (phase == '3') {
                            LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
                        }
                    }
                    else {
                        //MakeFieldOptional(objBaseForm,"RestrictionRelRef",HtmlElementById("cellRestrictionRelRef"));
                        HtmlElementById('btnOrgCode').className = 'resprobutton-res';
                        HtmlElementById('IsRestricted').checked = true;
                        HtmlElementById('IsRestricted').value = 1;
                        //Open Restriction detail PopUp by default for Restricted item
                        if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE')//added by krao fro OGD Process
                        {
                            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
                            if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = '';
                            MakeFieldOptional(objBaseForm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                        }
                        else {
                            if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = 'none';
                            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                            MakeFieldRequired(objBaseForm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                        }

                        var TariffItemId = HtmlElementById('TariffItemId').value;
                        if (phase == '3') {
                            LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
                        }
                    }
                    if (xmlTariffItemNode.getAttributeNode("ImpRes").nodeValue.indexOf("P") != -1 && xmlTariffItemNode.getAttributeNode("ImpRes").nodeValue.indexOf("R") != -1) {
                        HtmlElementById('IsRestricted').checked = true;
                        HtmlElementById('IsRestricted').value = 1;
                        //Open Restriction detail PopUp by default for Restricted item
                        if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE')//added by krao fro OGD Process
                        {
                            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
                            if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = '';
                            MakeFieldOptional(objBaseForm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                        }
                        else {
                            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                            if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = 'none';
                            MakeFieldRequired(objBaseForm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                        }

                        var TariffItemId = HtmlElementById('TariffItemId').value;
                        if (phase == '3') {
                            LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
                        }
                    }
                }
                else {
                    HtmlElementById('btnOrgCode').style.display = 'none';
                }
            }
            else if (BillType == global_BillType.Export) {
                codes = xmlTariffItemNode.getAttributeNode("TempExpCode").nodeValue;
                if ((codes != '') && (bBlockRestrictionProhibition != 'true')) {
                    HtmlElementById('btnOrgCode').value = codes;
                    HtmlElementById('btnOrgCode').style.display = '';
                    HtmlElementById('txtRestrictionName').value = codes;
                    HtmlElementById('txtRestrictionId').value = codes;
                    HtmlElementById('RestrictionRelRef').disabled = false;
                    //MakeFieldRequired(objBaseForm,"RestrictionRelRef",HtmlElementById("cellRestrictionRelRef"));
                    if (xmlTariffItemNode.getAttributeNode("ExpRes").nodeValue.indexOf("P") != -1) {
                        HtmlElementById('btnOrgCode').className = 'resprobutton-pro';
                        HtmlElementById('IsRestricted').checked = false;
                        HtmlElementById('IsRestricted').value = 0;
                        //Open Restriction detail PopUp by default for Restricted item
                        var TariffItemId = HtmlElementById('TariffItemId').value;
                        if (phase == '3') {
                            LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
                        }

                    }
                    else {
                        //MakeFieldOptional(objBaseForm,"RestrictionRelRef",HtmlElementById("cellRestrictionRelRef"));
                        HtmlElementById('btnOrgCode').className = 'resprobutton-res';
                        HtmlElementById('IsRestricted').checked = true;
                        HtmlElementById('IsRestricted').value = 1;
                        //Open Restriction detail PopUp by default for Restricted item
                        if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE')//added by krao fro OGD Process
                        {
                            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
                            if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = '';
                            MakeFieldOptional(objBaseForm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                        }
                        else {
                            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                            if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = 'none';
                            MakeFieldRequired(objBaseForm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                        }

                        var TariffItemId = HtmlElementById('TariffItemId').value;
                        if (phase == '3') {
                            LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
                        }

                    }
                    if (xmlTariffItemNode.getAttributeNode("ExpRes").nodeValue.indexOf("P") != -1 && xmlTariffItemNode.getAttributeNode("ExpRes").nodeValue.indexOf("R") != -1) {
                        HtmlElementById('IsRestricted').checked = true;
                        HtmlElementById('IsRestricted').value = 1;
                        //Open Restriction detail PopUp by default for Restricted item
                        if (GBL_Types.OGDPROCESS_TYPE.VALUE == 'TRUE')//added by krao fro OGD Process
                        {
                            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = true;
                            if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = '';
                            MakeFieldOptional(objBaseForm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                        }
                        else {
                            if (HtmlElementById('RestrictionRelRef') != null) HtmlElementById('RestrictionRelRef').disabled = false;
                            if (HtmlElementById('RelRef') != null) HtmlElementById('RelRef').style.display = 'none';
                            MakeFieldRequired(objBaseForm, "RestrictionRelRef", HtmlElementById("cellRestrictionRelRef"));
                        }

                        var TariffItemId = HtmlElementById('TariffItemId').value;
                        if (phase == '3') {
                            LockupScreen('itemdetails', 'ViewTariffItemPopUp', 'ViewItem', ProfileField('TariffItems.TariffItemId') + '=\'' + TariffItemId + '\'', 700, 500, true, false);
                        }
                    }
                }
                else {
                    HtmlElementById('btnOrgCode').style.display = 'none';
                }
            }
        }
    }
    ClearErrorMsg(objBaseForm.formexception.value);
    //objBaseForm.TariffItemId.value =xmlObjTemp.getAttributeNode("TariffItemId").nodeValue;
    //objBaseForm.hscode.value   =xmlObjTemp.getAttributeNode("Code").nodeValue;
    //objBaseForm.HSCodeDescription.value   =xmlObjTemp.getAttributeNode("Description").nodeValue;

}

function updateTaricCode(xmlObjTemp) {
    //update the values, related to HSCode.
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.TaricSubheadingId.value = xmlObjTemp.getAttributeNode("TaricSubheadingId").nodeValue;
    objBaseForm.tariccode.value = xmlObjTemp.getAttributeNode("Code").nodeValue;
    objBaseForm.TaricDescription.value = xmlObjTemp.getAttributeNode("Description").nodeValue;
    ClearErrorMsg(objBaseForm.formexception.value);
}

function updatePackType(xmlObjTemp) {
    //update the values, related to HSCode.
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.txthdPackageType.value = xmlObjTemp.getAttributeNode("TypeId").nodeValue;
    objBaseForm.txtpackagetype.value = xmlObjTemp.getAttributeNode("Description").nodeValue;
    ClearErrorMsg(objBaseForm.formexception.value);
}
function updateQtyType(xmlObjTemp) {
    //update the values, related to HSCode.
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.hdQtyType.value = xmlObjTemp.getAttributeNode("TypeId").nodeValue;
    objBaseForm.txtqtytype.value = xmlObjTemp.getAttributeNode("Description").nodeValue;
    ClearErrorMsg(objBaseForm.formexception.value);
}
function resetPackType() {
    //reset values, related to HSCode.
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.txthdPackageType.value = "";
    objBaseForm.txtpackagetype.value = "";
}
function resetQtyType() {
    //reset values, related to HSCode.
    var objBaseForm = document.forms["itemdetails"];
    objBaseForm.hdQtyType.value = "";
    objBaseForm.txtqtytype.value = "";
}




function DisableRelRef() {
    AntiDumpingManufacturerDomineData();
    if (getParameter('previouspageid', '') == '') {
        var objBaseForm = document.forms["itemdetails"];
        //objBaseForm.RestrictionRelRef.disabled = true;
    }
    var sCInvItemStateId = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@StateId', '');
    if (sCInvItemStateId == 'CommercialInvoiceItemStartState') {
        if (HtmlElementById('AssocHBItems') != null)
            HtmlElementById('AssocHBItems').style.display = 'none';
    }

}
function ControlViewDetails() {
    var frmObj = document.forms['itemdetails'];

    if (getParameter('actionid') == 'NewCommercialInvoiceItemOne')
        frmObj.VwDetails.disabled = true;
    else {
        if (frmObj.IsRestricted.checked == 1)
            frmObj.VwDetails.disabled = false;
        else
            frmObj.VwDetails.disabled = true;
    }
}
function validateQty() {
    var frm = document.forms['itemdetails'];
    if (checkRefDecId() == 'true') {
        var Qty = HtmlElementById('quantity').value;
        var AQty = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@ActualQty', '');
        var TQty = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@TransactedQty', '');
        var PQty = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@PQty', '');
        TQty = TQty == '' ? '0' : TQty;
        PQty = PQty == '' ? '0' : PQty;
        if (parseInt(Qty) > (parseInt(AQty) - (parseInt(TQty) + parseInt(PQty)))) {
            ShowFormException(frm.formexception.value, msgDictionary('validateprocessqty'), 'quantity');
            return false;
        }

        //Added by Jones - To Validate Qty and No Of Associated HBItems - Begin
        var NoOfHBItems = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@AssociatedHBItemsCount', '');
        NoOfHBItems = NoOfHBItems == '' ? '0' : NoOfHBItems;
        if (parseInt(Qty) < parseInt(NoOfHBItems)) {
            ShowFormException(frm.formexception.value, msgDictionary('QtyCheck'), 'quantity');
            return false;
        }
        //Added by Jones - Ends

    }

    var pageid = getParameter('pageid');
    if (pageid == 'CommercialInvoiceItem') {
        //Commented/Changed by Sthanikella For Fx Upgrade Req at saving invoiceitem - 14-feb-2017
        //checkDiscountValue(frm,'SaveCommercialInvoiceItemOne','OpenDeclaration',ProfileField('Declarations.DeclarationId','text') + '=N\''+document.itemdetails.DeclarationId.value+ '\'','SAD','0');

        checkDiscountValue(frm, 'SaveCommercialInvoiceItemOne', 'OpenCommercialInvoiceOne', ProfileField('CommercialInvoices.CommercialInvoiceId', 'text') + '=\'' + frm.CommercialInvoiceId.value + '\'', 'CommercialInvoice', '0');
    }
    else {
        //Commented/Changed by Sthanikella For Fx Upgrade Req at saving invoiceitem - 14-feb-2017
        //checkDiscountValue(frm,'SaveCommercialInvoiceItemOne','OpenDeclaration',ProfileField('Declarations.DeclarationId','text') + '=N\''+document.itemdetails.DeclarationId.value+ '\'','TransitBillSAD','0');

        checkDiscountValue(frm, 'SaveCommercialInvoiceItemOne', 'OpenCommercialInvoiceOne', ProfileField('CommercialInvoices.CommercialInvoiceId', 'text') + '=\'' + frm.CommercialInvoiceId.value + '\'', 'TransitCommercialInvoice', '0');
    }
}
function onBlurHSCode(frm) {
    if (frm.hscode.value.Trim() != '%' && frm.hscode.value.Trim().length > 2) {
        //added by sthanikella to reset the RestrictionRelRef on changind the HSCode.
        if (HtmlElementById('hdOGDRelRef') != null)
            HtmlElementById('hdOGDRelRef').value = '';
        if (HtmlElementById('RestrictionRelRef') != null)
            HtmlElementById('RestrictionRelRef').value = '';
        //end

        HtmlElementById('txtRestrictionName').value = '';
        HtmlElementById('IsRestricted').checked = false;
        SearchTest(frm.name, 'HSCodeLookUpList', 'OpenHSCode', '', resetHSCode, updateHSCode, Array(['Code', frm.hscode.value], ['Name', ''], ['Description', ''], ['ShortDescription', ''], ['CCPId', '\'' + HtmlElementById('CCPId').value + '\''], ['HouseBillId', HtmlElementById('HouseBillId').value], ['DeclarationId', HtmlElementById('DeclarationId').value]), sSearchPath + '/HSCodeForDeclarationrecords', 'HSCodeForDeclaration', 750, 475);
    }
    else {
        alert(msgDictionary('miniumnoofchar'));
    }
    ShowOrHideAntiDumpingFields(false);
    ShowOrHideAntiDumpingFields_latest(false);
    ShowOrHideCeramicProductManufacturers();
}

function enableRestrictionForDR() {
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    var sCusResName = MCgetAttribute('data/CommercialInvoiceItemsrecords/CustomsRestrictionTyperecords/CustomsRestrictionType/@Name', '');
    if (sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT) {
        if (HtmlElementById('IsRestricted') != null)
            HtmlElementById('IsRestricted').disabled = false;
        if (HtmlElementById('txtRestrictionName') != null)
            HtmlElementById('txtRestrictionName').disabled = false;
        if (HtmlElementById('RestrictionRelRef') != null) {
            HtmlElementById('RestrictionRelRef').disabled = false;
            HtmlElementById('txtRestrictionName').value = sCusResName;
        }
    }
}
function enableExemptionForDR() {
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    if (sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT || sCCPId == global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT) {
        if (HtmlElementById('IsExempted') != null)
            HtmlElementById('IsExempted').disabled = false;
        if (HtmlElementById('txtExemptionName') != null)
            HtmlElementById('txtExemptionName').disabled = false;
        if (HtmlElementById('ExemptionRef') != null)
            HtmlElementById('ExemptionRef').disabled = false;
        if (HtmlElementById('btnExemptionType') != null)
            HtmlElementById('btnExemptionType').disabled = false;
        if (HtmlElementById('txtExemptionBnf') != null)
            HtmlElementById('txtExemptionBnf').disabled = false;
        if (HtmlElementById('btnExemptionBnf') != null)
            HtmlElementById('btnExemptionBnf').disabled = false;
    }
}
function disableForShortOfItem() {
    var sForShortofItem = MCgetAttribute('data/Declarationsrecords/HouseBillsrecords/HouseBills/@ForShortofItem', '');
    if (sForShortofItem == '1') {
        var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
        if (sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_AIRPORT && sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_SEAPORT && sCCPId != global_CustomsControlProcedures.DIRECT_RELEASE_BILL_FOR_LANDPORT) {

            if (HtmlElementById('IsExempted') != null)
                HtmlElementById('IsExempted').disabled = true;
            if (HtmlElementById('txtExemptionName') != null)
                HtmlElementById('txtExemptionName').disabled = true;
            if (HtmlElementById('ExemptionRef') != null)
                HtmlElementById('ExemptionRef').disabled = true;
            if (HtmlElementById('btnExemptionType') != null)
                HtmlElementById('btnExemptionType').disabled = true;
            if (HtmlElementById('txtExemptionBnf') != null)
                HtmlElementById('txtExemptionBnf').disabled = true;
            if (HtmlElementById('btnExemptionBnf') != null)
                HtmlElementById('btnExemptionBnf').disabled = true;
        }
    }
}
function HideMaqasaRow() {
    var sMaqasa = MCgetAttribute("data/Declarationsrecords/Declarations/@Maqasa", '');
    //var frm=document.forms["invoice"];
    if (sMaqasa == "1") {
        if (HtmlElementById('RowMaqasa') != null)
            HtmlElementById('RowMaqasa').style.display = '';
    }
    else {
        if (HtmlElementById('RowMaqasa') != null)
            HtmlElementById('RowMaqasa').style.display = 'none';
        //MakeFieldOptional(frm,"MaqasaBayanNo",CellMaqasaBayanNo);
    }
}

function AntiDumpingManufacturerDomineData() {
    var defaultCri = '';
    var CICOO = '';
    var COO = $('#CountryOfOriginCode').val();
    var sHBCOO = MCgetAttribute('data/Declarationsrecords/HouseBillsrecords/HouseBills/@CountryOfOrigin', '');

    var CII = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@CommercialInvoiceId', '');
    for (var i = 0; i < MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/@TotalRecordsFetched', null); i++) {
        if (CII == MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices[' + i + ']/@CommercialInvoiceId', null)) {
            CICOO = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices[' + i + ']/@CountryOfOrigin', null);
        }
    }


    var CIICountryOfOrigin = $("#CountryOfOrigin").val();
    if (CIICountryOfOrigin == global_AntiDumpingCountry_India || sHBCOO == global_AntiDumpingCountry_India || CICOO == global_AntiDumpingCountry_India) {
        COO = 'IN';
    }
    else if (CIICountryOfOrigin == global_AntiDumpingCountry_Turkey || sHBCOO == global_AntiDumpingCountry_Turkey || CICOO == global_AntiDumpingCountry_Turkey) {
        COO = 'TR';
    }
    else if (CIICountryOfOrigin == global_AntiDumpingCountry_KoreaSouth || sHBCOO == global_AntiDumpingCountry_KoreaSouth || CICOO == global_AntiDumpingCountry_KoreaSouth) {
        COO = 'KR';
    }
    var frmObj = document.forms["itemdetails"];
    var objBS = HtmlElementById('BatterySize');

    var obj = HtmlElementById('AntiDumpingManufacturer');

    var obj1 = HtmlElementById('AntiDumpingManufacturerSpain');
    var objCeramicManufacturers = HtmlElementById('acAntiDumpingManufacturers');
    var sAntiDumpingManufacturer = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@AntiDumpingManufacturer', '')
    var sBatterySize = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@BatterySize', '')
    $("#AntiDumpingManufacturer").empty();

    $("#AntiDumpingManufacturerSpain").empty();
    $("#acAntiDumpingManufacturers").empty();
    $("#BatterySize").empty();
    var listStates = xmlServiceDocument.selectNodes(rootNodeName + "/domaindata/select[@id=\'AntiDumpingManufacturerKoreaSouth\']/option");

    var listBs = xmlServiceDocument.selectNodes(rootNodeName + "/domaindata/select[@id=\'BatterySize\']/option");
    for (var j = 0; j < listBs.length; j++) {
        var stateid = listBs[j].getAttribute('StateId');
        if (stateid == 'BatterySizeCreatedState' && COO == 'KR') {
            if (objBS.length <= 0) {
                var optempty = document.createElement('option');
                optempty.value = '';
                optempty.innerHTML = msgDictionary('SelBatterySize');;
                objBS.appendChild(optempty);
            }
            var opt = document.createElement('option');
            opt.value = listBs[j].getAttribute('TypeId');
            opt.innerHTML = listBs[j].getAttribute('Name');
            objBS.appendChild(opt);
        }
        if (stateid == 'IndiaTurkeyBatterySizeCreatedState' && (COO == 'IN' || COO == 'TR')) {
            if (objBS.length <= 0) {
                var optempty = document.createElement('option');
                optempty.value = '';
                optempty.innerHTML = msgDictionary('SelBatterySize');;
                objBS.appendChild(optempty);
            }
            var opt = document.createElement('option');
            opt.value = listBs[j].getAttribute('TypeId');
            opt.innerHTML = listBs[j].getAttribute('Name');
            objBS.appendChild(opt);
        }
    }


    for (var j = 0; j < listStates.length; j++) {
        var stateid = listStates[j].getAttribute('StateId');
        if (stateid == 'AntiDumpingManufacturerSpainCreatedState') {
            if (obj1.length <= 0) {
                var optempty = document.createElement('option');
                optempty.value = '';
                optempty.innerHTML = msgDictionary('SelAntiDumpingManufacturer');;
                obj1.appendChild(optempty);
            }
            var opt = document.createElement('option');
            opt.value = listStates[j].getAttribute('TypeId');
            opt.innerHTML = listStates[j].getAttribute('Name');
            obj1.appendChild(opt);
        }
        if (stateid == 'AntiDumpingManufacturerCreatedState' && COO == 'KR') {
            if (obj.length <= 0) {
                var optempty = document.createElement('option');
                optempty.value = '';
                optempty.innerHTML = msgDictionary('SelAntiDumpingManufacturer');;
                obj.appendChild(optempty);
            }
            var opt = document.createElement('option');
            opt.value = listStates[j].getAttribute('TypeId');
            opt.innerHTML = listStates[j].getAttribute('Name');
            obj.appendChild(opt);
        }
        if (stateid == 'AntiDumpingManufacturerIndiaCreatedState' && COO == 'IN') {
            if (obj.length <= 0) {
                var optempty = document.createElement('option');
                optempty.value = '';
                optempty.innerHTML = msgDictionary('SelAntiDumpingManufacturer');;
                obj.appendChild(optempty);
            }
            var opt = document.createElement('option');
            opt.value = listStates[j].getAttribute('TypeId');
            opt.innerHTML = listStates[j].getAttribute('Name');
            obj.appendChild(opt);
        }
        if (stateid == 'CeramicProductIndiaAndChinaCreatedState') {
            var optElement = document.createElement('option');
            if (objCeramicManufacturers.length <= 0) {
                optElement.value = '';
                optElement.innerHTML = msgDictionary('SelAntiDumpingManufacturer');;
                objCeramicManufacturers.appendChild(optElement);
            }
            else {
                optElement.value = listStates[j].getAttribute('TypeId');
                optElement.innerHTML = listStates[j].getAttribute('Name');
                objCeramicManufacturers.appendChild(optElement);
            }
        }
    }
    $('#AntiDumpingManufacturer').val(sAntiDumpingManufacturer);
    $('#AntiDumpingManufacturerSpain').val(sAntiDumpingManufacturer);
    $("#acAntiDumpingManufacturers").val(sAntiDumpingManufacturer);
    $("#BatterySize").val(sBatterySize);
}

function ShowOrHideAntiDumpingFields_latest(isOnload, ActionType) {
    var CIICountryOfOrigin = $("#CountryOfOrigin").val();
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');

    var frmObj = document.forms["itemdetails"];


    if (ActionType == undefined) {
        ActionType = "hide"

        var TariffItemId = $("#TariffItemId").val();

        var CIICountryOfOriginChina = $("#CountryOfOrigin").val();
        if (global_AntiDumpingAluminum_TariffItemIds.indexOf(',' + TariffItemId + ',') > -1) {
            if (global_AntiDumpingCountry_China != undefined && global_AntiDumpingCountry_China == CIICountryOfOrigin) {
                CIICountryOfOriginChina = $("#CountryOfOrigin").val();
            }
            else if (global_AntiDumpingCountry_China != undefined && global_AntiDumpingCountry_China == MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices/@CountryOfOrigin', '')) {
                CIICountryOfOriginChina = MCgetAttribute('data/Declarationsrecords/Declarations/CommercialInvoicesrecords/CommercialInvoices/@CountryOfOrigin', '');
            }
            else if (global_AntiDumpingCountry_China != undefined && global_AntiDumpingCountry_China == MCgetAttribute('data/Declarationsrecords/HouseBillsrecords/HouseBills/@CountryOfOrigin', '')) {
                CIICountryOfOriginChina = MCgetAttribute('data/Declarationsrecords/HouseBillsrecords/HouseBills/@CountryOfOrigin', '');
            }
        }



        var CustomsControlProcedureId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
        var BillType = MCgetAttribute('data/Declarationsrecords/Declarations/@BillType', '');

        var DIRECT_RECEIVABLE_BILL_FOR_AIRPORT = GBL_CustomsControlProcedures.AIRPORT.IMPORT_BILL.DIRECT_RECEIVABLE_BILL_FOR_AIRPORT;
        var DIRECT_RECEIVABLE_BILL_FOR_SEAPORT = GBL_CustomsControlProcedures.SEAPORT.IMPORT_BILL.DIRECT_RECEIVABLE_BILL_FOR_SEAPORT;
        var DIRECT_RECEIVABLE_BILL_FOR_LANDPORT = GBL_CustomsControlProcedures.LANDPORT.IMPORT_BILL.DIRECT_RECEIVABLE_BILL_FOR_LANDPORT;




        var sProductSpecification = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@ProductSpecification', '');
        var sAntiDumpingManufacturer = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@AntiDumpingManufacturer', '');
        if (isOnload) {
            if (HtmlElementById('AntiDumpingManufacturer') != null)
                $('#AntiDumpingManufacturer').val(sAntiDumpingManufacturer);
            if (HtmlElementById('AntiDumpingManufacturerSpain') != null)
                $('#AntiDumpingManufacturerSpain').val(sAntiDumpingManufacturer);
            if (HtmlElementById('Productspecification') != null)
                $('#Productspecification').val(sProductSpecification);
        }
        else {
            if (HtmlElementById('AntiDumpingManufacturer') != null)
                $('#AntiDumpingManufacturer').val('');
            if (HtmlElementById('AntiDumpingManufacturerSpain') != null)
                $('#AntiDumpingManufacturerSpain').val('');
            if (HtmlElementById('Productspecification') != null)
                $('#Productspecification').val('');
        }

        if ((global_AntiDumpingForPaper_COOs.indexOf(',' + CIICountryOfOrigin + ',') > -1 || global_AntiDumpingForPaper_COOs.indexOf(',' + CIICountryOfOriginChina + ',') > -1) && sCCPId != global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_AIRPORT && sCCPId != global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_SEAPORT && sCCPId != global_CustomsControlProcedures.TEMPORARY_IMPORT_BILL_FOR_LANDPORT && (BillType == global_BillType.Import && CustomsControlProcedureId != DIRECT_RECEIVABLE_BILL_FOR_AIRPORT && CustomsControlProcedureId != DIRECT_RECEIVABLE_BILL_FOR_SEAPORT && CustomsControlProcedureId != DIRECT_RECEIVABLE_BILL_FOR_LANDPORT)) {

            if (global_AntiDumpingForPaper_TariffItemIds != undefined && ((global_AntiDumpingCountry_China.indexOf(CIICountryOfOriginChina) == -1 && global_AntiDumpingForPaper_TariffItemIds.indexOf(',' + TariffItemId + ',') > -1) || (global_AntiDumpingCountry_China.indexOf(CIICountryOfOriginChina) > -1 && global_AntiDumpingAluminum_TariffItemIds.indexOf(',' + TariffItemId + ',') > -1))) {
                ActionType = "show";
            }
        }
    }
    if (ActionType == "hide") {
        $("#Productspecification").val("");
        $("#AntiDumpingManufacturerSpain").val("");
        MakeFieldOptional(frmObj, "Productspecification", HtmlElementById("Productspecification_Cell"));
        MakeFieldOptional(frmObj, "AntiDumpingManufacturerSpain", HtmlElementById("AntiDumpingManufacturerSpain_Cell"));

        if (!isOnload)
            $("#Manufacturer").val("");
        if ((CIICountryOfOrigin != global_AntiDumpingCountry_KoreaSouth)) {
            //$("#Manufacturer").removeAttr("disabled");
            $("#Manufacturer").attr("size", "30");
            MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
        }
        $("#AntiDumpingDetailsspainRow").hide();
    }
    else if (CIICountryOfOrigin == global_AntiDumpingCountry_KoreaSouth)
        $("#AntiDumpingDetailsspainRow").hide();

    else {
        var SelManufature = $("#AntiDumpingManufacturerSpain").val();
        if (SelManufature != global_AntiDumpingForPaperManufacture_Other) {
            if (!isOnload)
                $("#Manufacturer").val("");
            if ((CIICountryOfOrigin != global_AntiDumpingCountry_KoreaSouth)) {
                $("#Manufacturer").attr("disabled", "disabled");
                $("#Manufacturer").attr("size", "55");
                MakeFieldOptional(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
            }
        }
        else {
            $("#Manufacturer").removeAttr("disabled");
            $("#Manufacturer").attr("size", "30");
            MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
        }

        MakeFieldRequired(frmObj, "Productspecification", HtmlElementById("Productspecification_Cell"));
        MakeFieldRequired(frmObj, "AntiDumpingManufacturerSpain", HtmlElementById("AntiDumpingManufacturerSpain_Cell"));
        $("#AntiDumpingDetailsspainRow").show();

        var CIICountryOfOrigin1 = $("#CountryOfOrigin").val();
        var TariffItemId1 = $("#TariffItemId").val();
        if (global_AntiDumpingProdSpecAvailable_TariffItemIds != undefined && global_AntiDumpingProdSpecAvailable_TariffItemIds.indexOf(',' + TariffItemId1 + ',') == -1) {
            MakeFieldOptional(frmObj, "Productspecification", HtmlElementById("Productspecification_Cell"));

            $("#Productspecification").attr("disabled", "disabled");
            if (global_AntiDumpingCountry_Poland != undefined && global_AntiDumpingCountry_Poland == CIICountryOfOrigin1)
                $("#AntiDumpingDetailsspainRow").hide();
        }
        else {
            MakeFieldRequired(frmObj, "Productspecification", HtmlElementById("Productspecification_Cell"));

            $("#Productspecification").removeAttr("disabled");

            var sTercCnt = xmlServiceDocument.selectNodes("servicedocument/domaindata/select[@id='SpecificationforSpainAndPoland']/option");
            for (var i = 0; i <= sTercCnt.length - 1; i++) {
                var sName = sTercCnt[i].getAttribute("Name");
                var sTypeId = sTercCnt[i].getAttribute("TypeId");
                if (global_AntiDumpingCountry_China != undefined && (global_AntiDumpingCountry_China.indexOf(CIICountryOfOriginChina) > -1 && global_AntiDumpingAluminum_TariffItemIds.indexOf(',' + TariffItemId + ',') > -1)) {
                    if (global_AntiDumpingProdSpecAluminum_TypeIds.indexOf(',' + sTypeId + ',') == -1) {
                        $("#Productspecification option[value='" + sTypeId + "']").remove();
                    }
                    else {
                        $("#Productspecification option[value='" + sTypeId + "']").remove();
                        var ddlProductspecification = document.getElementById("Productspecification");
                        var option = document.createElement("option");
                        option.text = sName;
                        option.value = sTypeId;
                        ddlProductspecification.add(option);
                    }
                }
                else {
                    if (global_AntiDumpingProdSpecAluminum_TypeIds.indexOf(',' + sTypeId + ',') > -1) {
                        $("#Productspecification option[value='" + sTypeId + "']").remove();
                    }
                    else {
                        $("#Productspecification option[value='" + sTypeId + "']").remove();
                        var ddlProductspecification = document.getElementById("Productspecification");
                        var option = document.createElement("option");
                        option.text = sName;
                        option.value = sTypeId;
                        ddlProductspecification.add(option);
                    }
                }
            }
            if (isOnload) {
                $('#Productspecification').val(sProductSpecification);
            }


        }

        if (global_AntiDumpingCountry_Poland != undefined && global_AntiDumpingCountry_China != undefined && (global_AntiDumpingCountry_Poland == CIICountryOfOrigin1 || (global_AntiDumpingCountry_China.indexOf(CIICountryOfOriginChina) > -1 && global_AntiDumpingAluminum_TariffItemIds.indexOf(',' + TariffItemId + ',') > -1))) {
            MakeFieldOptional(frmObj, "AntiDumpingManufacturerSpain", HtmlElementById("AntiDumpingManufacturerSpain_Cell"));
            $("#AntiDumpingManufacturerSpain_Cell").hide();
            $("#AntiDumpingManufacturerSpain_lbl_Cell").hide();
            frmObj.hdAntiDumpingManufacturer.value = '0';
            if (!isOnload)
                $("#Manufacturer").val("");
            $("#Manufacturer").removeAttr("disabled");
            $("#Manufacturer").attr("size", "30");
            MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
        }
        else {
            MakeFieldRequired(frmObj, "AntiDumpingManufacturerSpain", HtmlElementById("AntiDumpingManufacturerSpain_Cell"));
            $("#AntiDumpingManufacturerSpain_Cell").show();
            $("#AntiDumpingManufacturerSpain_lbl_Cell").show();
        }
    }
}

function LoadCeramicProductManufacturers() {
    //var sCriteria = ProfileField('AntiDumpingManufacturerKoreaSouth.Name') + ' like N\'%{request.term}%\'';// and ' + ProfileField('AntiDumpingManufacturerKoreaSouth.Code') + ' = \'' + $('#CountryOfOriginCode').val() + '\'';
    //MCAutoCompleteDropDown('AntiDumpingManufacturers','hdAntiDumpingManufacturer','ListCeramicProductManufacturers', sCriteria,'./AntiDumpingManufacturerKoreaSouthrecords/AntiDumpingManufacturerKoreaSouth','Name','TypeId',LoadSelectedManufacturer,'200');
    MCAutoCompleteDropDown('AntiDumpingManufacturers', 'hdAntiDumpingManufacturer', 'ListCeramicProductManufacturers', fnLoadCeramicProductManufacturersCriteria, './AntiDumpingManufacturerKoreaSouthrecords/AntiDumpingManufacturerKoreaSouth', 'Name', 'TypeId', LoadSelectedManufacturer, '200');
}

function LoadSelectedManufacturer(sText, sValue) {
    var frmObj = document.forms["itemdetails"];
    var SelManufature = sValue;
    var SelManufatureText = sText;
    frmObj.hdAntiDumpingManufacturer.value = sValue;

    if (SelManufature != global_CeramicProductManufacturer_IN_Others && SelManufature != global_CeramicProductManufacturer_CH_Others) {
        if (SelManufature == "")
            $("#Manufacturer").val("");
        else
            $("#Manufacturer").val(SelManufatureText);

        $("#Manufacturer").attr("disabled", "disabled");
        $("#Manufacturer").attr("size", "55");
        MakeFieldOptional(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
    }
    else {
        $("#Manufacturer").val("");
        $("#Manufacturer").removeAttr("disabled");
        $("#Manufacturer").attr("size", "30");
        MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
    }
}


function ShowOrHideCeramicProductManufacturers() {
    var CIICountryOfOrigin = $("#CountryOfOrigin").val();
    var TariffItemId = $("#TariffItemId").val();
    var sCCPId = MCgetAttribute('data/Declarationsrecords/Declarations/@CustomsControlProcedureId', '');
    var sHBCOO = MCgetAttribute('data/Declarationsrecords/HouseBillsrecords/HouseBills/@CountryOfOrigin', '');

    var frmObj = document.forms["itemdetails"];
    if (((CIICountryOfOrigin == global_AntiDumpingCountry_India || CIICountryOfOrigin == global_AntiDumpingCountry_China
        || sHBCOO == global_AntiDumpingCountry_India || sHBCOO == global_AntiDumpingCountry_China
    ) && global_CeramicProductManufacturer_TariffItemIds.indexOf(',' + TariffItemId + ',') > -1)
        && (sCCPId == GBL_CustomsControlProcedures.AIRPORT.IMPORT_BILL.IMPORT
            || sCCPId == GBL_CustomsControlProcedures.LANDPORT.IMPORT_BILL.IMPORT
            || sCCPId == GBL_CustomsControlProcedures.SEAPORT.IMPORT_BILL.IMPORT
            || sCCPId == GBL_CustomsControlProcedures.AIRPORT.EXPORT_BILL.STATISTICAL
            || sCCPId == GBL_CustomsControlProcedures.LANDPORT.EXPORT_BILL.STATISTICAL
            || sCCPId == GBL_CustomsControlProcedures.SEAPORT.EXPORT_BILL.STATISTICAL
        )) {
        if (CIICountryOfOrigin != global_AntiDumpingCountry_India && CIICountryOfOrigin != global_AntiDumpingCountry_China
            && (sHBCOO == global_AntiDumpingCountry_India || sHBCOO == global_AntiDumpingCountry_China)) {
            $("#cell_lblAntiDumpingManufacturers").hide();
            $("#cell_txtAntiDumpingManufacturers").hide();
            MakeFieldOptional(frmObj, "acAntiDumpingManufacturers", HtmlElementById("cell_txtAntiDumpingManufacturers"));
            if (sHBCOO == global_AntiDumpingCountry_India)
                $('#hdAntiDumpingManufacturer').val(global_CeramicProductManufacturer_IN_Others);
            else if (sHBCOO == global_AntiDumpingCountry_China)
                $('#hdAntiDumpingManufacturer').val(global_CeramicProductManufacturer_CH_Others);
            $("#Manufacturer").removeAttr("disabled");
            $("#Manufacturer").attr("size", "30");
            MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
        }
        else {
            $("#cell_lblAntiDumpingManufacturers").show();
            $("#cell_txtAntiDumpingManufacturers").show();
            MakeFieldRequired(frmObj, "acAntiDumpingManufacturers", HtmlElementById("cell_txtAntiDumpingManufacturers"));
            MakeFieldOptional(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
            $("#Manufacturer").attr("disabled", "disabled");
            var sAntiDumpingManufacturer = MCgetAttribute('data/CommercialInvoiceItemsrecords/CommercialInvoiceItems/@AntiDumpingManufacturer', '');
            var sAntiDumpingManufacturerName = MCgetAttribute('data/CommercialInvoiceItemsrecords/AntiDumpingManufacturerKoreaSouthrecords/AntiDumpingManufacturerKoreaSouth[@TypeId=\'' + sAntiDumpingManufacturer + '\']/@Name', '')
            $('#acAntiDumpingManufacturers').val(sAntiDumpingManufacturerName);
        }
    }
    else {
        $("#cell_lblAntiDumpingManufacturers").hide();
        $("#cell_txtAntiDumpingManufacturers").hide();
        MakeFieldOptional(frmObj, "acAntiDumpingManufacturers", HtmlElementById("cell_txtAntiDumpingManufacturers"));
        $('#acAntiDumpingManufacturers').val('');

        $("#Manufacturer").attr("size", "30");
        MakeFieldRequired(frmObj, "Manufacturer", HtmlElementById("cell_Manufacturer"));
    }
}



function fnLoadCeramicProductManufacturersCriteria() {
    var defaultCri = '';
    var COO = $('#CountryOfOriginCode').val();
    var sHBCOO = MCgetAttribute('data/Declarationsrecords/HouseBillsrecords/HouseBills/@CountryOfOrigin', '');
    var CIICountryOfOrigin = $("#CountryOfOrigin").val();
    if (CIICountryOfOrigin == global_AntiDumpingCountry_India || sHBCOO == global_AntiDumpingCountry_India) {
        COO = 'IN';
        defaultCri = ProfileField('AntiDumpingManufacturerKoreaSouth.TypeId') + '=' + global_CeramicProductManufacturer_IN_Others;
    }
    else if (CIICountryOfOrigin == global_AntiDumpingCountry_China || sHBCOO == global_AntiDumpingCountry_China) {
        COO = 'CN';
        defaultCri = ProfileField('AntiDumpingManufacturerKoreaSouth.TypeId') + '=' + global_CeramicProductManufacturer_CH_Others;
    }

    //return ProfileField('AntiDumpingManufacturerKoreaSouth.Name') + ' like N\'%{request.term}%\'' + ' and ' + ProfileField('AntiDumpingManufacturerKoreaSouth.Code') + ' = \'' + $('#CountryOfOriginCode').val() + '\'';

    return '((' + defaultCri + ') OR (' + ProfileField('AntiDumpingManufacturerKoreaSouth.Name') + ' like N\'%{request.term}%\'' + ' and ' + ProfileField('AntiDumpingManufacturerKoreaSouth.Code') + ' = \'' + COO + '\'))';
}



