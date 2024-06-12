package com.project.cmsproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.cmsproject.entities.Quotation;
import com.project.cmsproject.exceptions.QuotationNotFoundException;
import com.project.cmsproject.repsoitories.QuotationRepository;

//QuotationServiceImpl.java

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
