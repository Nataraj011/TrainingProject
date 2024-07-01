package com.prodapt.cmsprojectmain.service;

import com.prodapt.cmsprojectmain.entities.Quotation;
import com.prodapt.cmsprojectmain.exceptions.QuotationNotFoundException;

public interface QuotationService {
    Quotation addQuotation(Quotation quotation);
    Quotation getQuotationById(Long id) throws QuotationNotFoundException;
    // Other service methods
}