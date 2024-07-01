package com.prodapt.cmsprojectmain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prodapt.cmsprojectmain.entities.Quotation;
import com.prodapt.cmsprojectmain.exceptions.QuotationNotFoundException;
import com.prodapt.cmsprojectmain.repositories.QuotationRepository;

@Service
public class QuotationServiceImpl implements QuotationService {

    @Autowired
    private QuotationRepository quotationRepository;

    @Override
    public Quotation addQuotation(Quotation quotation) {
        return quotationRepository.save(quotation);
    }

    @Override
    public Quotation getQuotationById(Long id) throws QuotationNotFoundException {
        return quotationRepository.findById(id).orElseThrow(() -> new QuotationNotFoundException("Quotation not found"));
    }
   

}
