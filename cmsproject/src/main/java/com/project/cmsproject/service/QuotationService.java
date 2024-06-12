package com.project.cmsproject.service;

import com.project.cmsproject.entities.Quotation;
import com.project.cmsproject.exceptions.QuotationNotFoundException;

public interface QuotationService {
    Quotation addQuotation(Quotation quotation);
    Quotation getQuotationById(Long id) throws QuotationNotFoundException;
    // Other service methods
}